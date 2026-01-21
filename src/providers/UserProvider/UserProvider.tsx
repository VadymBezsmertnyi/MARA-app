import React, { createContext, useContext, useMemo, useState } from "react";
import { Platform } from "react-native";
import { User } from "@react-native-google-signin/google-signin";
import { z } from "zod";

// types
import type { FunctionComponent } from "react";
import type { Props, Context, UserDataT } from "./UserProvider.types";

// schemas
import { userDataS } from "./UserProvider.schemas";

// providers
import { useLoadingProvider } from "../LoadingProvider/LoadingProvider";
import { useWebSocketProvider } from "../WebSocketProvider/WebSocketProvider";
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useBiometricProvider } from "../BiometricProvider/BiometricProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useAnalyticsProvider } from "../AnalyticsProvider/AnalyticsProvider";
import {
  DropdownAlertType,
  useDropDownAlertProvider,
} from "../DropDownAlertProvider/DropDownAlertProvider";

// components
import { ModalChangeAvatar } from "./components/ModalChangeAvatar/ModalChangeAvatar";

// helps
import {
  deleteDeviceStorage,
  getDeviceStorage,
  setDeviceStorage,
} from "../../helps/storage.help";

// constants
import { DEFAULT_USER_DATA } from "./UserProvider.constants";
import { PATHS } from "../paths.constants";
import { TOKEN_KEY_ASYNC_STORAGE } from "./UserProvider.constants";

export const userContext = createContext<Context>({} as Context);

const UserProvider: FunctionComponent<Props> = (props) => {
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n } = useLocalesProvider();
  const { setUserData: setUserDataSocket } = useWebSocketProvider();
  const { checkBiometric } = useBiometricProvider();
  const { api } = useApiProvider();
  const { setLoading } = useLoadingProvider();
  const { onSetUserProperties } = useAnalyticsProvider();
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
    };
    await onSetUserProperties(newUserDataAnalytics);
  };

  const cleanUserData = () => {
    setUserData(null);
    setUserDataSocket(null);
  };

  const setNewUserData = async (
    newUserData: UserDataT,
    tokens?: {
      accessToken: string;
      refreshToken: string;
    }
  ) => {
    if (tokens)
      await setDeviceStorage(TOKEN_KEY_ASYNC_STORAGE, JSON.stringify(tokens));
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
        z.object({
          userData: userDataS,
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        })
      );
      if (resultCreateNewUser) {
        setNewUserData(
          resultCreateNewUser.userData,
          resultCreateNewUser.tokens
        );
        return resultCreateNewUser.userData;
      }
      return null;
    } catch (error: any) {
      messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
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
        z.object({
          userData: userDataS,
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        })
      );
      if (resultCreateNewUser) {
        setNewUserData(
          resultCreateNewUser.userData,
          resultCreateNewUser.tokens
        );
        return resultCreateNewUser.userData;
      }
      return null;
    } catch (error: any) {
      messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
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
        z.object({
          userData: userDataS,
          tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
        })
      );
      if (resultCreateNewUser) {
        setNewUserData(
          resultCreateNewUser.userData,
          resultCreateNewUser.tokens
        );
        return resultCreateNewUser.userData;
      }
      return null;
    } catch (error: any) {
      messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
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
          z.object({
            userData: userDataS,
            tokens: z.object({
              accessToken: z.string(),
              refreshToken: z.string(),
            }),
          })
        );

        if (resultCreateNewUser && userData)
          await setAnalytics(resultCreateNewUser.userData, userData);

        if (resultCreateNewUser?.tokens) {
          await setDeviceStorage(
            TOKEN_KEY_ASYNC_STORAGE,
            JSON.stringify(resultCreateNewUser.tokens)
          );
          setUserData({
            ...DEFAULT_USER_DATA,
            ...resultCreateNewUser.userData,
          });
          setUserDataSocket({
            ...DEFAULT_USER_DATA,
            ...resultCreateNewUser.userData,
          });
        }
        return true;
      } catch (error: any) {
        messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
        return false;
      } finally {
        setLoading(false);
      }
    else
      messageFromServer(
        i18n._("Access denied"),
        "Info",
        DropdownAlertType.Info
      );
    return false;
  };

  const meUser = async (isLoading: boolean): Promise<UserDataT | null> => {
    try {
      const token = await getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
      if (!token) return null;
      if (isLoading) setLoading(true);
      const result = await api(
        PATHS.me,
        undefined,
        z.object({ userData: userDataS })
      );
      if (result?.userData) {
        const isCheckBiometric = result.userData.isCheckBiometric
          ? await checkBiometric()
          : true;

        if (!isCheckBiometric) return null;

        const userData = { ...DEFAULT_USER_DATA, ...result.userData };
        setUserData(userData);
        setUserDataSocket(userData);
        return userData;
      }
      return null;
    } catch (error: any) {
      if (error instanceof Error) {
        messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
      } else
        messageFromServer(error.toString(), "Warning", DropdownAlertType.Warn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const exitUser = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
      setUserData(null);
      setUserDataSocket(null);
      return true;
    } catch (error: any) {
      if (error instanceof Error) {
        messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
      } else
        messageFromServer(error.toString(), "Warning", DropdownAlertType.Warn);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    try {
      setLoading(true);
      if (userData?._id) {
        const request = await api(
          PATHS.delete,
          {
            method: "POST",
            data: { _id: userData._id },
          },
          z.object({ result: z.boolean() })
        );
        if (!request || !request.result) return false;
        await deleteDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
        setUserData(null);
        setUserDataSocket(null);
        return true;
      }
      return false;
    } catch (error: any) {
      if (error instanceof Error) {
        messageFromServer(error.toString(), "Error", DropdownAlertType.Error);
      } else
        messageFromServer(error.toString(), "Warning", DropdownAlertType.Warn);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: Context = useMemo(
    () => ({
      userData,
      setUserData,
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

export const useUserProvider = () => useContext(userContext);

export default UserProvider;
