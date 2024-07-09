import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Platform, Share } from "react-native";
import appsFlyer from "react-native-appsflyer";
import { userContext } from "../UserProvider/UserProvider";

type SharingContextType = {
  getSharedLink: (data: Record<string, string>) => void;
  dataDeepLink: Record<string, any> | null;
};

type SharingProviderProps = {
  children: React.ReactNode;
};

const EXPO_PUBLIC_APPS_FLYER_DEV_KEY = process.env
  .EXPO_PUBLIC_APPS_FLYER_DEV_KEY as string;

export const sharingContext = React.createContext<SharingContextType>(
  {} as SharingContextType
);

export const SharingProvider: FunctionComponent<SharingProviderProps> = ({
  children,
}) => {
  const { userData } = useContext(userContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [dataDeepLink, setDataDeepLink] = useState<Record<string, any> | null>(
    null
  );
  const userId = useMemo(() => userData?._id || null, [userData?._id]);

  const addUserDataDeepLink = () => {
    setIsFirstLaunch(false);
  };

  const getSharedLink = (data: Record<string, string>) => {
    if (userId)
      appsFlyer.generateInviteLink(
        {
          channel: "app",
          customerID: userId,
          userParams: {
            deep_link_value: `maraapp://?userId=${userId}`,
            userId,
            ...data,
          },
        },
        async (link) => {
          await Share.share({
            title: "M.A.R.A.(Moto Auto Road Assistant)",
            url: link as string,
            message: link as string,
          });
        },
        () => {
          Alert.alert("Error: Sorry");
        }
      );
  };

  const setAppsFlyer = async () => {
    const onDeepLinkCanceller = appsFlyer.onDeepLink((res) => {
      if (res && res.deepLinkStatus !== "NOT_FOUND") setDataDeepLink(res.data);
    });
    appsFlyer.onInstallConversionData(({ data }) => {
      setIsFirstLaunch(data.is_first_launch === "true");
    });
    await appsFlyer.initSdk({
      devKey: EXPO_PUBLIC_APPS_FLYER_DEV_KEY,
      isDebug: true,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
    });
    appsFlyer.setAppInviteOneLinkID("13Vx");
    onDeepLinkCanceller();
  };

  const contextValue: SharingContextType = useMemo(
    () => ({ getSharedLink, dataDeepLink }),
    [dataDeepLink]
  );

  useEffect(() => {
    if (Platform.OS !== "ios") setAppsFlyer();
  }, []);

  useEffect(() => {
    if (dataDeepLink && userId) addUserDataDeepLink();
  }, [isFirstLaunch, dataDeepLink, userId]);

  return (
    <sharingContext.Provider value={contextValue}>
      {children}
    </sharingContext.Provider>
  );
};
