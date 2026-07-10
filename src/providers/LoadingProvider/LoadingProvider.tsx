import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BlurView } from "expo-blur";

// redux
import { useUserSelector } from "../../storeRedux/apis/user/slice";
import { useEventsSelector } from "../../storeRedux/apis/events/slice";
import { useWorkshopsSelector } from "../../storeRedux/apis/workshops/slice";
import { useSmsVerificationSelector } from "../../storeRedux/apis/sms-verification/slice";

// components
import { Loader } from "./components/Loader/Loader";

// styles
import { styles } from "./LoadingProvider.style";

type LoadingContext = {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
};

type LoadingProviderType = {
  children: React.ReactNode;
  isLoadingProps?: boolean;
};

export const loadingContext = React.createContext({} as LoadingContext);

const LoadingProvider: FunctionComponent<LoadingProviderType> = ({
  children,
  isLoadingProps = false,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loading: userLoading } = useUserSelector();
  const { loading: eventsLoading } = useEventsSelector();
  const { loading: workshopsLoading } = useWorkshopsSelector();
  const { loading: smsVerificationLoading } = useSmsVerificationSelector();
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

  useEffect(() => {
    const anyLoading =
      userLoading ||
      eventsLoading ||
      workshopsLoading ||
      smsVerificationLoading;
    if (anyLoading) setIsLoading(true);
    else if (!isLoadingProps) setIsLoading(false);
  }, [
    userLoading,
    eventsLoading,
    workshopsLoading,
    smsVerificationLoading,
    isLoadingProps,
  ]);

  return (
    <loadingContext.Provider value={contextValue}>
      {children}
      {isLoading && <Loader />}
      {isLoading && <BlurView intensity={20} style={styles.containerBlur} />}
    </loadingContext.Provider>
  );
};

export const useLoadingProvider = () => useContext(loadingContext);

export default LoadingProvider;
