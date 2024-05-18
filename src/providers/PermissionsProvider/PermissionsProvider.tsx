import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { localesContext } from "../../../localization/localization.provider";

// helps
import { usePermissionsProvider } from "./usePermissionsProvider";

type PermissionsContext = {
  locationForegroundPermission: Location.PermissionStatus | null;
  locationBackgroundPermission: Location.PermissionStatus | null;
};

type PermissionsProviderProps = {
  children: React.ReactNode;
};

export const permissionsContext = createContext<PermissionsContext>(
  {} as PermissionsContext
);

export const PermissionsProvider: FunctionComponent<
  PermissionsProviderProps
> = ({ children }) => {
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const { titleLocationBackground, titleLocationForeground } =
    usePermissionsProvider();
  const [locationForegroundPermission, setLocationForegroundPermission] =
    useState<Location.PermissionStatus | null>(null);
  const [locationBackgroundPermission, setLocationBackgroundPermission] =
    useState<Location.PermissionStatus | null>(null);

  const checkPermissionForeground = async () => {
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    if (statusForeground !== Location.PermissionStatus.GRANTED)
      Linking.openSettings();
    setLocationForegroundPermission(statusForeground);
    return statusForeground === Location.PermissionStatus.GRANTED;
  };

  const getPermissionsLocationForeground = async () => {
    const { status: statusForeground } =
      await Location.getForegroundPermissionsAsync();
    setLocationForegroundPermission(statusForeground);
    if (
      statusForeground !== Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocation
    )
      Alert.alert(titleLocationForeground, undefined, [
        {
          text: i18n._("Cancel"),
          style: "cancel",
        },
        {
          text: i18n._("Accept"),
          onPress: async () => {
            await checkPermissionForeground();
          },
        },
      ]);
    return statusForeground === Location.PermissionStatus.GRANTED;
  };

  const checkPermissionBackground = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    if (statusBackground !== Location.PermissionStatus.GRANTED)
      Linking.openSettings();
    setLocationBackgroundPermission(statusBackground);
    return statusBackground === Location.PermissionStatus.GRANTED;
  };

  const getPermissionsLocationBackground = async () => {
    const { status: statusBackground } =
      await Location.getBackgroundPermissionsAsync();
    setLocationBackgroundPermission(statusBackground);
    if (
      statusBackground !== Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground
    )
      Alert.alert(titleLocationBackground, undefined, [
        {
          text: i18n._("Cancel"),
          style: "cancel",
        },
        {
          text: i18n._("Accept"),
          onPress: async () => {
            await checkPermissionBackground();
          },
        },
      ]);
    //setIsBackgroundModal(true);
    return statusBackground === Location.PermissionStatus.GRANTED;
  };

  const valueContext: PermissionsContext = useMemo(
    () => ({ locationForegroundPermission, locationBackgroundPermission }),
    [locationForegroundPermission, locationBackgroundPermission]
  );

  useEffect(() => {
    if (userData?.isGeoLocation && locationForegroundPermission === null)
      getPermissionsLocationForeground();
    if (
      locationForegroundPermission === Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground &&
      locationBackgroundPermission === null
    )
      getPermissionsLocationBackground();
  }, [
    userData?.isGeoLocation,
    locationForegroundPermission,
    userData?.isGeoLocationBackground,
    locationBackgroundPermission,
  ]);

  return (
    <permissionsContext.Provider value={valueContext}>
      {children}
    </permissionsContext.Provider>
  );
};
