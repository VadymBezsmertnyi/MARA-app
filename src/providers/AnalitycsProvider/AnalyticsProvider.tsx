import React, { FunctionComponent, useEffect, useMemo } from "react";
import analytics from "@react-native-firebase/analytics";

// types
import { MethodAuthType } from "./AnalyticsProvider.types";

type AnalyticsContext = {
  onLogLogin: (method: MethodAuthType) => Promise<void>;
  onLogSignUp: (method: MethodAuthType) => Promise<void>;
};

type AnalyticsProviderProps = {
  children: JSX.Element;
};

export const analyticsContext = React.createContext({} as AnalyticsContext);

export const AnalyticsProvider: FunctionComponent<AnalyticsProviderProps> = ({
  children,
}) => {
  const onLogAppOpen = async () => {
    await analytics().logAppOpen();
    const test = await analytics().getSessionId();
  };

  const onLogSignUp = async (method: MethodAuthType) => {
    await analytics().logSignUp({ method });
  };

  const onLogLogin = async (method: MethodAuthType) => {
    await analytics().logLogin({
      method,
    });
  };

  const contextValue: AnalyticsContext = useMemo(
    () => ({ onLogLogin, onLogSignUp }),
    []
  );

  useEffect(() => {
    onLogAppOpen();
  }, []);

  return (
    <analyticsContext.Provider value={contextValue}>
      {children}
    </analyticsContext.Provider>
  );
};
