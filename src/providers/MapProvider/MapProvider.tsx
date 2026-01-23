import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Linking } from "react-native";
import { useUserProvider } from "../UserProvider/UserProvider";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as BackgroundFetch from "expo-background-fetch";
import { z } from "zod";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { usePermissionsProvider } from "../PermissionsProvider/PermissionsProvider";

// constants
import { PATHS } from "../paths.constants";

type MapContext = {
  location: Location.LocationObjectCoords | null;
  setPermission: () => Promise<void>;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const INTERVAL_GET_LOCATION = 15000;
const LOCATION_TASK_NAME = "background-location-task";
const INTERVAL_BACKGROUND = 60;

export const mapContext = React.createContext({} as MapContext);

const MapProvider: FunctionComponent<MapProviderProps> = ({ children }) => {
  const { api } = useApiProvider();
  const { userData } = useUserProvider();
  const { locationForegroundPermission, locationBackgroundPermission } =
    usePermissionsProvider();
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [startGetGeolocation, setStartGetGeolocation] =
    useState<boolean>(false);
  const [countryUser, setCountryUser] = useState<{
    country: string;
    countryCode: string;
  } | null>(null);

  const setPermission = async () => {
    await Linking.openSettings();
  };

  const getLocation = async (coordsProps?: Location.LocationObject) => {
    const { coords } = coordsProps
      ? coordsProps
      : await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          mayShowUserSettingsDialog: true,
          timeInterval: INTERVAL_GET_LOCATION,
          distanceInterval: 1,
        });

    setLocation(coords);
  };

  const getCountryUser = async () => {
    const result = countryUser
      ? countryUser
      : await api(
          PATHS.ipApiGetCountry,
          null,
          z.object({
            country: z.string(),
            countryCode: z.string(),
          })
        );
    if (!countryUser) setCountryUser(result);
  };

  const onIntervalGetLocation = () => {
    const intervalId = setInterval(getLocation, INTERVAL_GET_LOCATION);
    setStartGetGeolocation(true);
    getLocation();
    return () => {
      clearInterval(intervalId);
    };
  };

  const stopGetLocationBackground = async () => {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    if (!tasks.find((f) => f.taskName === LOCATION_TASK_NAME)) return;
    await BackgroundFetch.unregisterTaskAsync(LOCATION_TASK_NAME);
  };

  const startGetLocationBackground = async () => {
    TaskManager.defineTask<{ locations: Location.LocationObject[] }>(
      LOCATION_TASK_NAME,
      async ({ data }) => {
        if (data) {
          const { locations } = data;
          await getLocation(locations[0]);
        }
      }
    );
    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
      case BackgroundFetch.BackgroundFetchStatus.Restricted:
      case BackgroundFetch.BackgroundFetchStatus.Denied:
        return;
      default: {
        let tasks = await TaskManager.getRegisteredTasksAsync();
        if (tasks.find((f) => f.taskName === LOCATION_TASK_NAME) === null) {
          await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME);
          tasks = await TaskManager.getRegisteredTasksAsync();
        }

        await BackgroundFetch.setMinimumIntervalAsync(INTERVAL_BACKGROUND);
        await BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
          minimumInterval: INTERVAL_BACKGROUND,
          stopOnTerminate: false,
          startOnBoot: true,
        });
      }
    }
  };

  const valueContext: MapContext = useMemo(
    () => ({ location, setPermission }),
    [location]
  );

  useEffect(() => {
    if (
      userData?.isGeoLocation &&
      locationForegroundPermission === Location.PermissionStatus.GRANTED &&
      !startGetGeolocation
    )
      getCountryUser();
  }, [
    userData?.isGeoLocation,
    locationForegroundPermission,
    startGetGeolocation,
  ]);

  useEffect(() => {
    if (
      locationForegroundPermission === Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground &&
      locationBackgroundPermission === Location.PermissionStatus.GRANTED
    )
      startGetLocationBackground();
  }, [
    locationForegroundPermission,
    userData?.isGeoLocationBackground,
    locationBackgroundPermission,
  ]);

  useEffect(() => {
    if (countryUser) onIntervalGetLocation();
  }, [countryUser]);

  return (
    <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>
  );
};

export const useMapProvider = () => useContext(mapContext);

export default MapProvider;
