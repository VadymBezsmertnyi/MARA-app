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

// redux
import { useUserSelector } from "../../storeRedux/apis/user/slice";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// helps
import { usePermissionsProviderState } from "./usePermissionsProvider";

type PermissionsContext = {
  locationForegroundPermission: Location.PermissionStatus | null;
};

type PermissionsProviderProps = {
  children: React.ReactNode;
};

export const permissionsContext = createContext<PermissionsContext>(
  {} as PermissionsContext
);

const PermissionsProvider: FunctionComponent<PermissionsProviderProps> = ({
  children,
}) => {
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const { titleLocationForeground } = usePermissionsProviderState();
  const [locationForegroundPermission, setLocationForegroundPermission] =
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

  const valueContext: PermissionsContext = useMemo(
    () => ({ locationForegroundPermission }),
    [locationForegroundPermission]
  );

  useEffect(() => {
    if (userData?.isGeoLocation && locationForegroundPermission === null)
      getPermissionsLocationForeground();
  }, [userData?.isGeoLocation, locationForegroundPermission]);

  return (
    <permissionsContext.Provider value={valueContext}>
      {children}
    </permissionsContext.Provider>
  );
};

export const usePermissionsProvider = () => useContext(permissionsContext);

export default PermissionsProvider;
