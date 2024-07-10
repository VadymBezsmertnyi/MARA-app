import React, { FunctionComponent, useContext, useMemo } from "react";

type SubscriptionContext = {};

type SubscriptionProviderProps = {
  children: React.ReactNode;
};

export const subscriptionContext = React.createContext(
  {} as SubscriptionContext
);

export const SubscriptionProvider: FunctionComponent<
  SubscriptionProviderProps
> = ({ children }) => {
  const contextValue: SubscriptionContext = useMemo(() => ({}), []);
  return (
    <subscriptionContext.Provider value={contextValue}>
      {children}
    </subscriptionContext.Provider>
  );
};

export const useSubscriptionProvider = () => useContext(subscriptionContext);

export default SubscriptionProvider;
