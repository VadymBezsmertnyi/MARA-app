import React, { createContext, useContext, useMemo, useState } from "react";
import { t } from "@lingui/macro";
import { User } from "@react-native-google-signin/google-signin";

// types
import type { FunctionComponent } from "react";
import type { Props, Context, UserDataT } from "./user.types";

// schemas
import { resultUserDataS, userDataS } from "./user.schemas";

// providers
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { webSocketContext } from "../WebSocketProvider/WebSocketProvider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { biometricAuthenticatorContext } from "../biometricAuthenticator/biometricAuthenticator.provider";

// helps
import showErrors from "../../helps/errors/showError";
import { getErrors } from "../../helps/errors/errors.helps";
import {
  deleteDeviceStorage,
  setDeviceStorage,
} from "../../helps/storage.help";

// constants
import { DEFAULT_USER_DATA } from "./user.constants";
import { PATHS } from "../paths.constants";
import { TOKEN_NAME } from "./user.constants";

export const userContext = createContext<Context>({} as Context);

export const UserProvider: FunctionComponent<Props> = (props) => {
  const { i18n } = props;
  const { setUserData: setUserDataSocket } = useContext(webSocketContext);
  const { checkBiometric } = useContext(biometricAuthenticatorContext);
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { info, bug, warning } = showErrors;
  const [userData, setUserData] = useState<UserDataT | null>(null);

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

  const editUser = async (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null
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
      } catch (error) {
        bug(error);
        return false;
      } finally {
        setLoading(false);
      }
    else info(t(i18n)`Access denied`);
    return false;
  };

  const meUser = async (): Promise<UserDataT | null> => {
    try {
      setLoading(true);
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

  const exitUser = async (): Promise<void> => {
    try {
      setLoading(true);
      await deleteDeviceStorage(TOKEN_NAME);
      setUserData(null);
      setUserDataSocket(null);
    } catch (error: any) {
      if (error instanceof Error) {
        showErrors.bug(error);
      } else showErrors.warning(error);
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
    }),
    [userData]
  );

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
