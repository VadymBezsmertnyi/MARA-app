import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import qs from "qs";

// types
import { Language } from "../../../localization/localization.types";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { LocationObjectCoords } from "expo-location";

type PushNotificationContext = {
  setLanguageNotification: (language: Language) => void;
  addSosNotification: (location: LocationObjectCoords) => Promise<void>;
};

type PushNotificationProviderProps = {
  children: React.ReactNode;
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
> = ({ children }) => {
  const { userData, editUser } = useContext(userContext);

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
    if (initialUrl)
      console.log("Linking.parse(initialUrl)-map:", Linking.parse(initialUrl));
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
  return (
    <pushNotificationContext.Provider value={valueContext}>
      {children}
    </pushNotificationContext.Provider>
  );
};
