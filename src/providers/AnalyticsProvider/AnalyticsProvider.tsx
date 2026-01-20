import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import analytics from "@react-native-firebase/analytics";

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
    await analytics().setAnalyticsCollectionEnabled(true);
    await analytics().setConsent({
      ad_personalization: true,
      ad_storage: true,
      ad_user_data: true,
      analytics_storage: true,
      functionality_storage: true,
      personalization_storage: true,
      security_storage: true,
    });
    await analytics().logAppOpen();
  };

  const onLogSignUp = async (method: MethodAuthType) => {
    await analytics().logSignUp({ method });
  };

  const onLogLogin = async (method: MethodAuthType) => {
    await analytics().logLogin({
      method,
    });
  };

  const onLogScreenView = async () => {
    if (currentRouteName)
      if (currentRouteName !== previousRouteName)
        await analytics().logScreenView({
          screen_class: currentRouteName,
          screen_name: currentRouteName,
        });
    setPreviousRouteName(currentRouteName);
  };

  const onSetUserProperties = async (
    properties: Record<string, string | null>
  ) => {
    await analytics().setUserProperties(properties);
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
