import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getApp } from "@react-native-firebase/app";
import {
  getAnalytics,
  setConsent,
  setAnalyticsCollectionEnabled,
  logEvent,
  setUserProperties,
  type ConsentSettings,
} from "@react-native-firebase/analytics";

// types
import { MethodAuthType } from "./AnalyticsProvider.types";

type AnalyticsContext = {
  onLogLogin: (method: MethodAuthType) => Promise<void>;
  onLogSignUp: (method: MethodAuthType) => Promise<void>;
  onSetUserProperties: (
    properties: Record<string, string | null>
  ) => Promise<void>;
};

type AnalyticsProviderProps = {
  children: React.ReactNode;
  currentRouteName: string | null;
};

export const analyticsContext = React.createContext({} as AnalyticsContext);

const AnalyticsProvider: FunctionComponent<AnalyticsProviderProps> = ({
  children,
  currentRouteName,
}) => {
  const [previousRouteName, setPreviousRouteName] = useState<string | null>(
    null
  );
  const onLogAppOpen = async () => {
    const analytics = getAnalytics(getApp());
    await setAnalyticsCollectionEnabled(analytics, true);
    const consentSettings: ConsentSettings = {
      ad_personalization: true,
      ad_storage: true,
      ad_user_data: true,
      analytics_storage: true,
      functionality_storage: true,
      personalization_storage: true,
      security_storage: "granted",
    };
    await setConsent(analytics, consentSettings);
    await logEvent(analytics, "app_open");
  };

  const onLogSignUp = async (method: MethodAuthType) => {
    await logEvent(getAnalytics(getApp()), "sign_up", { method });
  };

  const onLogLogin = async (method: MethodAuthType) => {
    await logEvent(getAnalytics(getApp()), "login", { method });
  };

  const onLogScreenView = async () => {
    if (currentRouteName)
      if (currentRouteName !== previousRouteName)
        await logEvent(getAnalytics(getApp()), "screen_view", {
          screen_class: currentRouteName,
          screen_name: currentRouteName,
        });
    setPreviousRouteName(currentRouteName);
  };

  const onSetUserProperties = async (
    properties: Record<string, string | null>
  ) => {
    const analytics = getAnalytics(getApp());
    await setUserProperties(analytics, properties);
  };

  const contextValue: AnalyticsContext = useMemo(
    () => ({ onLogLogin, onLogSignUp, onSetUserProperties }),
    []
  );

  useEffect(() => {
    onLogAppOpen();
  }, []);

  useEffect(() => {
    onLogScreenView();
  }, [currentRouteName]);

  return (
    <analyticsContext.Provider value={contextValue}>
      {children}
    </analyticsContext.Provider>
  );
};

export const useAnalyticsProvider = () => useContext(analyticsContext);

export default AnalyticsProvider;
