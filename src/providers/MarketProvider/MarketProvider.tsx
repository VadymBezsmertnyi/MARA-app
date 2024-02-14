import React, { FunctionComponent, useMemo } from "react";

type MarketContext = {};

type MarketProviderProps = {
  children: React.ReactNode;
};

export const marketContext = React.createContext({} as MarketContext);

export const MarketProvider: FunctionComponent<MarketProviderProps> = ({
  children,
}) => {
  const valueContext: MarketContext = useMemo(() => ({}), []);

  return (
    <marketContext.Provider value={valueContext}>
      {children}
    </marketContext.Provider>
  );
};
