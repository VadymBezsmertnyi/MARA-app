import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

// types
import {
  BiometricContextType,
  BiometricProviderType,
} from "./BiometricProvider.types";

// providers
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { localesContext } from "../../../localization/localization.provider";

// magic numbers
const TOUCH_TYPE = 1;
const FACE_TYPE = 2;
const IRIS_TYPE = 3;

export const biometricAuthenticatorContext = React.createContext(
  {} as BiometricContextType
);

export const BiometricProvider: FunctionComponent<BiometricProviderType> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const { setLoading } = useContext(loadingContext);
  // SecurityLevel = 0-NONE, 1-SECRET, 2-BIOMETRIC
  const [securityLevel, setSecurityLevel] = useState<number | null>(null);
  // AuthenticationType = 1-FINGERPRINT, 2-FACIAL_RECOGNITION, 3-IRIS(Android)
  const [authenticationType, setAuthenticationType] = useState<number[] | null>(
    null
  );
  const isGlobalOn = true;

  const isFaceId = useMemo(
    () =>
      authenticationType
        ? authenticationType.includes(FACE_TYPE) && isGlobalOn
        : false,
    [authenticationType]
  );
  const isTouchId = useMemo(
    () =>
      authenticationType
        ? authenticationType.includes(TOUCH_TYPE) && isGlobalOn
        : false,
    [authenticationType]
  );
  const isIrisId = useMemo(
    () =>
      authenticationType && Platform.OS === "android"
        ? authenticationType.includes(IRIS_TYPE) && isGlobalOn
        : false,
    [authenticationType]
  );

  const getBiometricTypes = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      if (securityLevel === null) {
        const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
        setSecurityLevel(enrolledLevel);
      }
      if (authenticationType === null) {
        const authenticationTypes =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        setAuthenticationType(authenticationTypes);
      }
    } catch (error) {
      console.log("error-getBiometricTypes", error);
    } finally {
      setLoading(false);
    }
  }, [authenticationType, securityLevel, setLoading]);

  const checkBiometric = async (): Promise<boolean> => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (hasHardware) {
        await LocalAuthentication.isEnrolledAsync();
        const { success } = await LocalAuthentication.authenticateAsync({
          promptMessage: i18n._(`Please authenticator`),
        });
        return success;
      }
      return false;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const contextValue: BiometricContextType = useMemo(
    () => ({ isFaceId, isTouchId, isIrisId, checkBiometric }),
    [isFaceId, isTouchId, isIrisId]
  );

  useEffect(() => {
    getBiometricTypes();
  }, []);

  return (
    <biometricAuthenticatorContext.Provider value={contextValue}>
      {children}
    </biometricAuthenticatorContext.Provider>
  );
};
