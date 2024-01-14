import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { BlurView } from "expo-blur";

// components
import { Loader } from "./components/Loader/Loader";

// styles
import { styles } from "./LoadingProvider.style";

type LoadingContext = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

type LoadingProviderType = {
  children: JSX.Element;
  isLoadingProps?: boolean;
};

export const loadingContext = React.createContext({} as LoadingContext);

export const LoadingProvider: FunctionComponent<LoadingProviderType> = ({
  children,
  isLoadingProps = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (state: boolean) => {
    setIsLoading(state);
  };

  const contextValue: LoadingContext = useMemo(
    () => ({ isLoading, setLoading }),
    [isLoading]
  );

  useEffect(() => {
    setIsLoading(!isLoadingProps);
  }, [isLoadingProps]);

  return (
    <loadingContext.Provider value={contextValue}>
      {children}
      {isLoading && <Loader />}
      {isLoading && <BlurView intensity={20} style={styles.containerBlur} />}
    </loadingContext.Provider>
  );
};
