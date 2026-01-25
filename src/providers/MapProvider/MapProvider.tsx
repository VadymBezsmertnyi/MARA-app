import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Linking } from "react-native";
import * as Location from "expo-location";
import { z } from "zod";

// redux
import { useUserSelector } from "../../storeRedux/apis/user/slice";

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

export const mapContext = React.createContext({} as MapContext);

const MapProvider: FunctionComponent<MapProviderProps> = ({ children }) => {
  const { api } = useApiProvider();
  const { userData } = useUserSelector();
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
    if (countryUser) getLocation();
  }, [countryUser]);

  return (
    <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>
  );
};

export const useMapProvider = () => useContext(mapContext);

export default MapProvider;
