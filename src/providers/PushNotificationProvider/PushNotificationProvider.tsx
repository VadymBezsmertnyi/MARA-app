import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import qs from "qs";
import { LocationObjectCoords } from "expo-location";

// types
import { Language } from "../../../localization/localization.types";
import { InitialUrlType } from "./PushNotificationProvider.types";

// providers
import { userContext } from "../UserProvider/UserProvider";

// schemas
import { typeInitialUrlSchema } from "./PushNotificationProvider.schemas";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_WORKSHOP_SCREENS,
} from "../../navigators/useNavigator.constants";

type PushNotificationContext = {
  setLanguageNotification: (language: Language) => void;
  addSosNotification: (location: LocationObjectCoords) => Promise<void>;
};

type PushNotificationProviderProps = {
  children: React.ReactNode;
  currentRouteName: string | null;
};

const oneSignalAppId =
  (Constants.expoConfig?.extra?.oneSignalAppId as string) || "";

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);

export const pushNotificationContext = React.createContext(
  {} as PushNotificationContext
);

export const PushNotificationProvider: FunctionComponent<
  PushNotificationProviderProps
> = ({ children, currentRouteName }) => {
  const navigation = useNavigation<
    NativeStackNavigationProp<{
      [PATHS_MAIN_SCREENS.main]?: Record<string, string>;
      [PATHS_MAIN_TABS.workshops]?: {
        screen: string;
        params: { workshopId: number };
      };
    }>
  >();
  const { userData, editUser } = useContext(userContext);
  const [tempGoLink, setTempGoLink] = useState<InitialUrlType | null>(null);

  const setSubscriptionNotification = async () => {
    if (userData) {
      const userSubscriptionId =
        OneSignal.User.pushSubscription.getPushSubscriptionId();
      if (userData.subscriptionId !== userSubscriptionId)
        await editUser({ ...userData, subscriptionId: userSubscriptionId });
    }
  };

  const setLanguageNotification = (language: Language) => {
    OneSignal.User.setLanguage(language);
  };

  const getNewParams = async () => {
    const initialUrl = await Linking.getInitialURL();
    const currentInitialUrl = initialUrl
      ? typeInitialUrlSchema.safeParse(Linking.parse(initialUrl))
      : null;
    if (currentInitialUrl?.success) setTempGoLink(currentInitialUrl.data);
  };

  const addSosNotification = async (location: LocationObjectCoords) => {
    const queryParams = qs.stringify(
      {
        type: "sos",
        latitude: location.latitude,
        longitude: location.longitude,
      },
      { addQueryPrefix: true }
    );
    const url = Linking.createURL("/main");

    // TODO to server for push notification
    console.log("url", `${url}${queryParams}`);
  };

  const valueContext: PushNotificationContext = useMemo(
    () => ({ setLanguageNotification, addSosNotification }),
    []
  );

  useEffect(() => {
    if (userData?.id) setSubscriptionNotification();
    getNewParams();
  }, [userData?.id]);

  useEffect(() => {
    const stateNavigate = navigation.getState();
    const isMainScreen = stateNavigate?.routes.length
      ? stateNavigate.routes[stateNavigate.index].name ===
        PATHS_MAIN_SCREENS.main
      : false;
    if (tempGoLink && currentRouteName === PATHS_MAIN_TABS.map && isMainScreen)
      if (tempGoLink.path === PATHS_MAIN_TABS.workshops) {
        navigation.navigate(PATHS_MAIN_TABS.workshops, {
          screen: PATHS_WORKSHOP_SCREENS.workshopItem,
          params: {
            workshopId: Number(tempGoLink.queryParams.workshopId),
          },
        });
        setTempGoLink(null);
      }
  }, [tempGoLink, currentRouteName]);
  return (
    <pushNotificationContext.Provider value={valueContext}>
      {children}
    </pushNotificationContext.Provider>
  );
};
