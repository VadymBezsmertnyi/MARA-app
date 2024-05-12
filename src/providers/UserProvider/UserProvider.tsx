import React, { createContext, useContext, useMemo, useState } from "react";
import { Platform } from "react-native";
import { t } from "@lingui/macro";
import { User } from "@react-native-google-signin/google-signin";
import { z } from "zod";

// types
import type { FunctionComponent } from "react";
import type { Props, Context, UserDataT } from "./UserProvider.types";

// schemas
import { resultUserDataS, userDataS } from "./UserProvider.schemas";

// providers
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { webSocketContext } from "../WebSocketProvider/WebSocketProvider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { biometricAuthenticatorContext } from "../BiometricProvider/BiometricProvider";
import { localesContext } from "../../../localization/localization.provider";
import { analyticsContext } from "../AnalyticsProvider/AnalyticsProvider";

// components
import { ModalChangeAvatar } from "./components/ModalChangeAvatar/ModalChangeAvatar";

// helps
import showErrors from "../../helps/errors/showError";
import { getErrors } from "../../helps/errors/errors.helps";
import {
  deleteDeviceStorage,
  setDeviceStorage,
} from "../../helps/storage.help";

// constants
import { DEFAULT_USER_DATA } from "./UserProvider.constants";
import { PATHS } from "../paths.constants";
import { TOKEN_NAME } from "./UserProvider.constants";

export const userContext = createContext<Context>({} as Context);

export const UserProvider: FunctionComponent<Props> = (props) => {
  const { i18n } = useContext(localesContext);
  const { setUserData: setUserDataSocket } = useContext(webSocketContext);
  const { checkBiometric } = useContext(biometricAuthenticatorContext);
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { onSetUserProperties } = useContext(analyticsContext);
  const { info, bug, warning } = showErrors;
  const [userData, setUserData] = useState<UserDataT | null>(null);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const setAnalytics = async (
    newUserData: UserDataT,
    oldUserData: UserDataT
  ) => {
    const newUserDataAnalytics = {
      ...(newUserData.languageLocal !== oldUserData.languageLocal && {
        language: newUserData.languageLocal,
      }),
      platform: Platform.OS,
      amountWorkshops: newUserData.workshopsIds.length.toString(),
      amountEvents: newUserData.eventsIds.length.toString(),
      amountProducts: newUserData.productsIds.length.toString(),
    };
    await onSetUserProperties(newUserDataAnalytics);
  };

  const cleanUserData = () => {
    setUserData(null);
    setUserDataSocket(null);
  };

  const setNewUserData = async (
    verifyToken: string | null,
    newUserData: UserDataT
  ) => {
    if (verifyToken) await setDeviceStorage(TOKEN_NAME, verifyToken);
    setUserData({
      ...DEFAULT_USER_DATA,
      ...newUserData,
    });
    setUserDataSocket({
      ...DEFAULT_USER_DATA,
      ...newUserData,
    });
  };

  const signInFacebook = async (
    accessToken: string
  ): Promise<UserDataT | null> => {
    setLoading(true);
    try {
      const resultCreateNewUser = await api(
        PATHS.loginFacebook,
        {
          method: "POST",
          data: {
            accessToken,
          },
        },
        userDataS
      );
      if (resultCreateNewUser) {
        setNewUserData(resultCreateNewUser.verifyToken, resultCreateNewUser);
        return resultCreateNewUser;
      }
      return null;
    } catch (error: any) {
      bug(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async (userData: User): Promise<UserDataT | null> => {
    setLoading(true);
    try {
      const resultCreateNewUser = await api(
        PATHS.loginGoogle,
        {
          method: "POST",
          data: {
            idToken: userData.idToken,
          },
        },
        userDataS
      );
      if (resultCreateNewUser) {
        setNewUserData(resultCreateNewUser.verifyToken, resultCreateNewUser);
        return resultCreateNewUser;
      }
      return null;
    } catch (error: any) {
      bug(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInApple = async (
    identityToken: string
  ): Promise<UserDataT | null> => {
    setLoading(true);
    try {
      const resultCreateNewUser = await api(
        PATHS.loginApple,
        {
          method: "POST",
          data: {
            identityToken,
          },
        },
        userDataS
      );
      if (resultCreateNewUser) {
        setNewUserData(resultCreateNewUser.verifyToken, resultCreateNewUser);
        return resultCreateNewUser;
      }
      return null;
    } catch (error: any) {
      bug(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null | undefined
    >
  ): Promise<boolean> => {
    if (userData)
      try {
        setLoading(true);
        const resultCreateNewUser = await api(
          PATHS.editUser,
          {
            method: "PUT",
            data: {
              ...userData,
              ...newInfoUser,
              time_token: 1,
            },
          },
          resultUserDataS
        );

        if (resultCreateNewUser && userData)
          await setAnalytics(resultCreateNewUser.userData, userData);

        if (
          resultCreateNewUser?.result &&
          resultCreateNewUser.userData.verifyToken
        ) {
          await setDeviceStorage(
            TOKEN_NAME,
            resultCreateNewUser.userData.verifyToken
          );
          setUserData({
            ...DEFAULT_USER_DATA,
            ...resultCreateNewUser.userData,
          });
          setUserDataSocket({
            ...DEFAULT_USER_DATA,
            ...resultCreateNewUser.userData,
          });
        } else info(getErrors(i18n)[resultCreateNewUser?.code || ""]);
        return true;
      } catch (error: any) {
        bug(error);
        return false;
      } finally {
        setLoading(false);
      }
    else info(t(i18n)`Access denied`);
    return false;
  };

  const meUser = async (isLoading: boolean): Promise<UserDataT | null> => {
    try {
      if (isLoading) setLoading(true);
      const result = await api(PATHS.me, undefined, userDataS);
      if (result) {
        const isCheckBiometric = result.isCheckBiometric
          ? await checkBiometric()
          : true;

        if (!isCheckBiometric) return null;

        const userData = { ...DEFAULT_USER_DATA, ...result };
        setUserData(userData);
        setUserDataSocket(userData);
        return userData;
      }
      return null;
    } catch (error: any) {
      if (error instanceof Error) {
        bug(error);
      } else warning(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const exitUser = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteDeviceStorage(TOKEN_NAME);
      setUserData(null);
      setUserDataSocket(null);
      return true;
    } catch (error: any) {
      if (error instanceof Error) {
        showErrors.bug(error);
      } else showErrors.warning(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    try {
      setLoading(true);
      if (userData?.id) {
        await api(
          PATHS.delete,
          {
            method: "POST",
            data: { id: userData.id },
          },
          z.object({ result: z.boolean() })
        );
        await deleteDeviceStorage(TOKEN_NAME);
        setUserData(null);
        setUserDataSocket(null);
        return true;
      }
      return false;
    } catch (error: any) {
      if (error instanceof Error) {
        showErrors.bug(error);
      } else showErrors.warning(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: Context = useMemo(
    () => ({
      userData,
      cleanUserData,
      editUser,
      meUser,
      exitUser,
      signInGoogle,
      signInApple,
      signInFacebook,
      deleteUser,
      setIsChangeAvatar,
    }),
    [userData]
  );

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
      {isChangeAvatar ? (
        <ModalChangeAvatar
          userData={userData}
          onClose={() => {
            setIsChangeAvatar(false);
          }}
          editUser={editUser}
        />
      ) : null}
    </userContext.Provider>
  );
};
