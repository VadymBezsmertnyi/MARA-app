import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Platform, Share } from "react-native";
import appsFlyer from "react-native-appsflyer";

// redux
import { useUserSelector } from "../../storeRedux/apis/user/slice";

type SharingContextType = {
  getSharedLink: (data: Record<string, string>) => void;
  createSharedLink: (data: Record<string, string>) => Promise<string | null>;
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

const SharingProvider: FunctionComponent<SharingProviderProps> = ({
  children,
}) => {
  const { userData } = useUserSelector();
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [dataDeepLink, setDataDeepLink] = useState<Record<string, any> | null>(
    null
  );
  const userId = useMemo(() => userData?._id || null, [userData?._id]);

  const addUserDataDeepLink = () => {
    setIsFirstLaunch(false);
  };

  const buildSharedLink = (data: Record<string, string>) =>
    new Promise<string | null>((resolve) => {
      if (!userId) {
        resolve(null);
        return;
      }
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
        (link: string) => {
          resolve(link);
        },
        () => {
          resolve(null);
        }
      );
    });

  const createSharedLink = (data: Record<string, string>) =>
    buildSharedLink(data);

  const getSharedLink = async (data: Record<string, string>) => {
    const link = await buildSharedLink(data);
    if (!link) {
      Alert.alert("Error: Sorry");
      return;
    }
    await Share.share({
      title: "M.A.R.A.(Moto Auto Road Assistant)",
      url: link,
      message: link,
    });
  };

  const setAppsFlyer = async () => {
    const onDeepLinkCanceller = appsFlyer.onDeepLink((res: any) => {
      if (res && res.deepLinkStatus !== "NOT_FOUND") setDataDeepLink(res.data);
    });
    appsFlyer.onInstallConversionData(({ data }: any) => {
      setIsFirstLaunch(data.is_first_launch === "true");
    });
    await appsFlyer.initSdk({
      devKey: EXPO_PUBLIC_APPS_FLYER_DEV_KEY,
      isDebug: true,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      appId: Platform.OS === "ios" ? "6502443474" : undefined,
    });
    appsFlyer.setAppInviteOneLinkID("13Vx");
    onDeepLinkCanceller();
  };

  const contextValue: SharingContextType = useMemo(
    () => ({ getSharedLink, createSharedLink, dataDeepLink }),
    [dataDeepLink, userId]
  );

  useEffect(() => {
    setAppsFlyer();
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

export const useSharingProvider = () => useContext(sharingContext);

export default SharingProvider;
