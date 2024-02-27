import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Linking } from "react-native";
import { userContext } from "../UserProvider/UserProvider";
import * as Location from "expo-location";
import { z } from "zod";

// types
import { UserLocationMapType } from "./MapProvider.types";

// providers
import { webSocketContext } from "../WebSocketProvider/WebSocketProvider";
import { apiContext } from "../ApiProvider/ApiProvider";

// schemas
import { usersLocationMapSchema } from "./MapProvider.schemas";

// constants
import { PATHS } from "../paths.constants";

type MapContext = {
  location: Location.LocationObjectCoords | null;
  usersMaps: UserLocationMapType[] | null;
  statusForeground: Location.PermissionStatus | null;
  statusBackground: Location.PermissionStatus | null;
  setPermission: () => Promise<void>;
  onSendSos: (
    phoneNumber: string,
    telegram: string,
    description: string
  ) => Promise<void>;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const INTERVAL_GET_LOCATION = 15000;

export const mapContext = React.createContext({} as MapContext);

export const MapProvider: FunctionComponent<MapProviderProps> = ({
  children,
}) => {
  const { api } = useContext(apiContext);
  const { userData } = useContext(userContext);
  const { sendLocation } = useContext(webSocketContext);
  const [statusForeground, setStatusForeground] =
    useState<Location.PermissionStatus | null>(null);
  const [statusBackground, setStatusBackground] =
    useState<Location.PermissionStatus | null>(null);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [startGetGeolocation, setStartGetGeolocation] =
    useState<boolean>(false);
  const [usersMaps, setUsersMap] = useState<UserLocationMapType[] | null>(null);

  const getStatusApp = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    setStatusBackground(statusBackground);
    setStatusForeground(statusForeground);
  };

  const checkPermission = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    setStatusBackground(statusBackground);
    setStatusForeground(statusForeground);

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
    console.log("isPermission", isPermission);
  };

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const result = await api(
      PATHS.ipApiGetCountry,
      null,
      z.object({
        country: z.string(),
        countryCode: z.string(),
      })
    );
    const isUkraine =
      result?.country === "Ukraine" || result?.countryCode === "UA";
    const date = new Date().getTime();
    // TODO delete later
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
        z.object({ usersLocation: usersLocationMapSchema })
      );
      if (result) setUsersMap(result.usersLocation);
    }

    setLocation(coords);
    sendLocation(coords); // Send to websocket
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
      console.log("dataLocationUser", dataLocationUser);
    }
  };

  const valueContext: MapContext = useMemo(
    () => ({
      location,
      usersMaps,
      statusForeground,
      statusBackground,
      setPermission,
      onSendSos,
    }),
    [location, usersMaps, statusForeground, statusBackground]
  );

  useEffect(() => {
    if (userData?.isGeoLocation) getStatusApp();
  }, [userData?.isGeoLocation]);

  useEffect(() => {
    if (statusForeground !== null)
      if (userData?.isGeoLocation && statusForeground === "undetermined")
        checkPermission();
    if (statusForeground === "granted" && !startGetGeolocation)
      onIntervalGetLocation();
  }, [statusForeground]);

  return (
    <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>
  );
};
