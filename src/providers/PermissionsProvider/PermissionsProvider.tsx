import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Location from "expo-location";

// providers
import { userContext } from "../UserProvider/UserProvider";

// helps
import { usePermissionsProvider } from "./usePermissionsProvider";

// components
import { ModalPermission } from "../../components/ModalPermission/ModalPermission";

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
  const { userData } = useContext(userContext);
  const { titleLocationBackground, titleLocationForeground } =
    usePermissionsProvider();
  const [locationForegroundPermission, setLocationForegroundPermission] =
    useState<Location.PermissionStatus | null>(null);
  const [locationBackgroundPermission, setLocationBackgroundPermission] =
    useState<Location.PermissionStatus | null>(null);
  const [isForegroundModal, setIsForegroundModal] = useState(false);
  const [isBackgroundModal, setIsBackgroundModal] = useState(false);

  const getPermissionsLocationForeground = async () => {
    const { status: statusForeground } =
      await Location.getForegroundPermissionsAsync();
    setLocationForegroundPermission(statusForeground);
    if (
      statusForeground !== Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocation
    )
      setIsForegroundModal(true);
    return statusForeground === Location.PermissionStatus.GRANTED;
  };

  const checkPermissionForeground = async () => {
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    setLocationForegroundPermission(statusForeground);
    return statusForeground === Location.PermissionStatus.GRANTED;
  };

  const getPermissionsLocationBackground = async () => {
    const { status: statusBackground } =
      await Location.getBackgroundPermissionsAsync();
    setLocationBackgroundPermission(statusBackground);
    if (
      statusBackground !== Location.PermissionStatus.GRANTED &&
      userData?.isGeoLocationBackground
    )
      setIsBackgroundModal(true);
    return statusBackground === Location.PermissionStatus.GRANTED;
  };

  const checkPermissionBackground = async () => {
    const { status: statusBackground } =
      await Location.requestBackgroundPermissionsAsync();
    setLocationBackgroundPermission(statusBackground);
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
  }, []);

  return (
    <permissionsContext.Provider value={valueContext}>
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
    </permissionsContext.Provider>
  );
};
