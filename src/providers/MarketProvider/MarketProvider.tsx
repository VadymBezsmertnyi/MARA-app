import React, { FunctionComponent, useMemo } from "react";

type MapContext = {};

type MarketProviderProps = {
  children: React.ReactNode;
};

export const marketContext = React.createContext({} as MapContext);

export const MarketProvider: FunctionComponent<MarketProviderProps> = ({
  children,
}) => {
  const valueContext: MapContext = useMemo(() => ({}), []);

  return (
    <marketContext.Provider value={valueContext}>
      {children}
    </marketContext.Provider>
  );
};
