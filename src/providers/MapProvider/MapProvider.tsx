import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Linking } from "react-native";
import { userContext } from "../UserProvider/UserProvider";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import * as BackgroundFetch from "expo-background-fetch";
import { z } from "zod";
import Constants from "expo-constants";

// types
import { UserLocationMapType, UserLocationSosType } from "./MapProvider.types";

// providers
import { webSocketContext } from "../WebSocketProvider/WebSocketProvider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { ModalPermission } from "../../components/ModalPermission/ModalPermission";

// schemas
import {
  userLocationSosSchema,
  usersLocationMapSchema,
  usersLocationSosSchema,
} from "./MapProvider.schemas";

// constants
import { PATHS } from "../paths.constants";

type MapContext = {
  location: Location.LocationObjectCoords | null;
  usersMaps: UserLocationMapType[] | null;
  usersSos: UserLocationSosType[] | null;
  statusForeground: Location.PermissionStatus | null;
  statusBackground: Location.PermissionStatus | null;
  setPermission: () => Promise<void>;
  onSendSos: (
    phoneNumber: string,
    telegram: string,
    description: string
  ) => Promise<void>;
  onDeleteSos: () => Promise<void>;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const INTERVAL_GET_LOCATION = 15000;
const LOCATION_TASK_NAME = "background-location-task";
const INTERVAL_BACKGROUND = 60;

export const mapContext = React.createContext({} as MapContext);

export const MapProvider: FunctionComponent<MapProviderProps> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const { api } = useContext(apiContext);
  const { userData } = useContext(userContext);
  const { sendLocation } = useContext(webSocketContext);
  const [statusForeground, setStatusForeground] =
    useState<Location.PermissionStatus | null>(null);
  const [isForegroundModal, setIsForegroundModal] = useState<boolean>(false);
  const [statusBackground, setStatusBackground] =
    useState<Location.PermissionStatus | null>(null);
  const [isBackgroundModal, setIsBackgroundModal] = useState<boolean>(false);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [startGetGeolocation, setStartGetGeolocation] =
    useState<boolean>(false);
  const [usersMaps, setUsersMap] = useState<UserLocationMapType[] | null>(null);
  const [usersSos, setUsersSos] = useState<UserLocationSosType[] | null>(null);
  const [countryUser, setCountryUser] = useState<{
    country: string;
    countryCode: string;
  } | null>(null);
  const nameApp = useMemo(
    () => Constants.expoConfig?.name || "M.A.R.A.(Moto Auto Road Assistance)",
    [Constants.expoConfig?.name]
  );
  const titleLocationForeground = useMemo(
    () =>
      i18n._("Allow {nameApp} to access this device's location?", { nameApp }),
    [nameApp]
  );
  const titleLocationBackground = useMemo(
    () =>
      i18n._(
        "Allow {nameApp} to access this device's location in the background?",
        { nameApp }
      ),
    [nameApp]
  );

  const getStatusAppBackground = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    setStatusBackground(statusBackground);

    if (statusBackground === Location.PermissionStatus.GRANTED) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  };

  const checkPermissionForeground = async () => {
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    setStatusForeground(statusForeground);

    return statusForeground === Location.PermissionStatus.GRANTED;
  };

  const checkPermissionBackground = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    setStatusBackground(statusBackground);

    return statusBackground === Location.PermissionStatus.GRANTED;
  };

  const checkPermission = async () => {
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    setStatusForeground(statusForeground);
    if (
      statusForeground === Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground
    ) {
      const { status: statusBackground } =
        await Location.requestBackgroundPermissionsAsync();
      setStatusBackground(statusBackground);
    }

    if (statusForeground === Location.PermissionStatus.GRANTED) {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    }

    return (
      statusForeground === Location.PermissionStatus.GRANTED &&
      statusBackground === Location.PermissionStatus.GRANTED
    );
  };

  const setPermission = async () => {
    const isPermission = await checkPermission();
    if (!isPermission) await Linking.openSettings();
  };

  const getLocation = async (coordsProps?: Location.LocationObject) => {
    const { coords } = coordsProps
      ? coordsProps
      : await Location.getCurrentPositionAsync({});
    const isUkraine =
      countryUser?.country === "Ukraine" || countryUser?.countryCode === "UA";
    const date = new Date().getTime();
    if (userData) {
      const dataLocationUser = {
        date,
        userId: userData.id,
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        isUkraine,
      };
      const result = await api(
        PATHS.locationUsers,
        { method: "POST", data: dataLocationUser },
        z.object({
          usersLocation: usersLocationMapSchema,
          usersSos: usersLocationSosSchema,
        })
      );
      if (result) {
        setUsersMap(result.usersLocation);
        setUsersSos(result.usersSos);
      }
    }

    setLocation(coords);
    sendLocation(coords); // Send to websocket
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

  const onSendSos = async (
    phoneNumber: string,
    telegram: string,
    description: string
  ) => {
    const date = new Date().getTime();
    if (userData && location) {
      const dataLocationUser = {
        date,
        userId: userData.id,
        location,
        phoneNumber,
        telegram,
        description,
      };
      const result = await api(
        PATHS.locationUsersSosAdd,
        { method: "POST", data: dataLocationUser },
        z.object({
          userLocationSos: userLocationSosSchema,
        })
      );
      if (result)
        setUsersSos((state) =>
          state ? [...state, result.userLocationSos] : [result.userLocationSos]
        );
    }
  };

  const onDeleteSos = async () => {
    if (userData) {
      await api(PATHS.locationUsersSosDelete, {
        method: "DELETE",
        data: { userId: userData.id },
      });
      setUsersSos((state) =>
        state ? state.filter((userSos) => userSos.userId !== userData.id) : []
      );
    }
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
      }
    }
  };

  const valueContext: MapContext = useMemo(
    () => ({
      location,
      usersMaps,
      usersSos,
      statusForeground,
      statusBackground,
      setPermission,
      onSendSos,
      onDeleteSos,
    }),
    [location, usersMaps, usersSos, statusForeground, statusBackground]
  );

  useEffect(() => {
    if (
      userData?.isGeoLocation &&
      (statusForeground === "undetermined" || statusForeground === null)
    )
      setIsForegroundModal(true);
    if (
      statusForeground === Location.PermissionStatus.GRANTED &&
      !startGetGeolocation &&
      userData?.isGeoLocationBackground
    ) {
      getCountryUser();
      setIsBackgroundModal(true);
    }
  }, [
    userData?.isGeoLocation,
    userData?.isGeoLocationBackground,
    statusForeground,
  ]);

  useEffect(() => {
    if (
      statusForeground === Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground &&
      (statusBackground === "undetermined" || statusBackground === null)
    )
      getStatusAppBackground();
  }, [userData?.isGeoLocationBackground, statusBackground, statusForeground]);

  useEffect(() => {
    if (
      userData?.isGeoLocationBackground &&
      statusBackground === Location.PermissionStatus.GRANTED
    )
      startGetLocationBackground();
  }, [statusBackground]);

  useEffect(() => {
    if (countryUser) onIntervalGetLocation();
  }, [countryUser]);

  return (
    <mapContext.Provider value={valueContext}>
      {children}
      <ModalPermission
        isOpen={isForegroundModal}
        title={titleLocationForeground}
        onCancel={() => {
          setIsForegroundModal(false);
        }}
        onAccept={async () => {
          setIsForegroundModal(false);
          await checkPermissionForeground();
        }}
      />
      <ModalPermission
        isOpen={isBackgroundModal}
        title={titleLocationBackground}
        onCancel={() => {
          setIsBackgroundModal(false);
        }}
        onAccept={async () => {
          setIsBackgroundModal(false);
          await checkPermissionBackground();
        }}
      />
    </mapContext.Provider>
  );
};
