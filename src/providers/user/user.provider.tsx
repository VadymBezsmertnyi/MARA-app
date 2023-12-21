import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import QueryString from "qs";
import { t } from "@lingui/macro";

// types
import type { FunctionComponent } from "react";
import type { Props, Context, UserDataT } from "./user.types";
import { KeysAuthorizationT } from "../../screens/Authorization/Authorization.types";

// schemas
import { shortResponseS } from "../source.schemas";
import { resultUserDataS } from "./user.schemas";

// providers
import { loadingContext } from "../loading/loading.provider";
import { webSocketContext } from "../WebSocketProvider/WebSocketProvider";
import { apiContext } from "../ApiProvider/ApiProvider";

// helps
import showErrors from "../../helps/errors/showError";
import { getErrors } from "../../helps/errors/errors.helps";
import {
  deleteDeviceStorage,
  getDeviceStorage,
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
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { info, bug, warning } = showErrors;
  const [userData, setUserData] = useState<UserDataT | null>(null);

  const cleanUserData = () => {
    setUserData(null);
    setUserDataSocket(null);
  };

  const registrationPhone = async (
    phone_number: string
  ): Promise<UserDataT | null> => {
    try {
      const resultCreateNewUser = await api(
        PATHS.addPhone,
        {
          method: "POST",
          data: {
            phone_number,
          },
        },
        resultUserDataS
      );
      return resultCreateNewUser?.userData || null;
    } catch (error: any) {
      bug(error);
      throw error;
    }
  };

  const sendCodeToUser = async (
    phone_number: string,
    isForget?: boolean
  ): Promise<{ result: boolean; isHaveUser: boolean }> => {
    try {
      setLoading(true);
      const currentlyPhoneNumber = phone_number.replaceAll(" ", "");
      const resultCreateNewUser = await registrationPhone(currentlyPhoneNumber);
      if (resultCreateNewUser?.is_password && !isForget)
        return { result: false, isHaveUser: resultCreateNewUser.is_password };
      await api(
        PATHS.sendCodeToUser,
        {
          method: "POST",
          data: { phone_number },
        },
        shortResponseS
      );
      setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser });
      setUserDataSocket({ ...DEFAULT_USER_DATA, ...resultCreateNewUser });
      return {
        result: true,
        isHaveUser: resultCreateNewUser?.is_password || false,
      };
    } catch (error: any) {
      bug(error);
      return { result: true, isHaveUser: false };
    } finally {
      setLoading(false);
    }
  };

  const sendVerifyCode = async (code: string): Promise<boolean> => {
    try {
      setLoading(true);
      const resultSendCode = await api(
        PATHS.verifyCodePhone,
        {
          method: "POST",
          data: {
            userId: userData?.id,
            phone_number: userData?.phone_number,
            code,
          },
        },
        resultUserDataS
      );
      if (resultSendCode?.result) {
        setUserData({ ...DEFAULT_USER_DATA, ...resultSendCode.userData });
        setUserDataSocket({ ...DEFAULT_USER_DATA, ...resultSendCode.userData });
        return true;
      }
      warning(t(i18n)`Code incorrect`);
      return resultSendCode?.result || false;
    } catch (error: any) {
      bug(error);
      setUserData(null);
      setUserDataSocket(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, string | number | boolean>
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

        if (resultCreateNewUser?.result) {
          await setDeviceStorage(
            TOKEN_NAME,
            resultCreateNewUser.userData.verify_token
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
        console.log("error", error);
        bug(error);
        return false;
      } finally {
        setLoading(false);
      }
    else info(t(i18n)`Access denied`);
    return false;
  };

  const meUser = async (): Promise<boolean> => {
    try {
      const verifyToken = await getDeviceStorage(TOKEN_NAME);
      const queryParams = QueryString.stringify(
        { verifyToken },
        { addQueryPrefix: true }
      );
      const url = `${PATHS.me}${queryParams}`;
      if (verifyToken) {
        setLoading(true);
        const result = await api(url, undefined, resultUserDataS);
        if (result?.result) {
          const userData = { ...DEFAULT_USER_DATA, ...result.userData };
          setUserData(userData);
          setUserDataSocket(userData);
          return true;
        }
        showErrors.warning(getErrors(i18n)[result?.code || ""]);
        return false;
      }

      return false;
    } catch (error: any) {
      if (error instanceof Error) {
        bug(error);
      } else warning(error);
      return false;
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

  const loginUser = async (
    dataLogin: Record<KeysAuthorizationT, string>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.login,
        { method: "POST", data: dataLogin },
        resultUserDataS
      );

      if (result?.result) {
        await setDeviceStorage(TOKEN_NAME, result?.userData.verify_token);
        const userData = { ...DEFAULT_USER_DATA, ...result?.userData };
        info(`Welcome ${userData.first_name} ${userData.family_name}`);
        setUserData(userData);
        setUserDataSocket(userData);
        return true;
      }
      info(getErrors(i18n)[result?.code || ""]);
      return false;
    } catch (error: any) {
      bug(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordSendCodeToUser = async (
    phone_number: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.sendCodeToUser,
        {
          method: "POST",
          data: { phone_number },
        },
        shortResponseS
      );
      setUserData((state) => ({
        ...DEFAULT_USER_DATA,
        ...state,
        phone_number,
      }));
      setUserDataSocket((state) => ({
        ...DEFAULT_USER_DATA,
        ...state,
        phone_number,
      }));
      return result?.result || false;
    } catch (error: any) {
      bug(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordSendVerifyCode = async (
    code: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.verifyCodePhoneRecoveryPassword,
        {
          method: "POST",
          data: {
            userId: userData?.id,
            phone_number: userData?.phone_number,
            code,
          },
        },
        shortResponseS
      );
      if (result?.result) {
        setUserData((state) => ({
          ...DEFAULT_USER_DATA,
          ...state,
          is_verified: true,
        }));
        setUserDataSocket((state) => ({
          ...DEFAULT_USER_DATA,
          ...state,
          is_verified: true,
        }));
      } else warning(t(i18n)`Code incorrect`);
      return result?.result || false;
    } catch (error: any) {
      bug(error);
      setUserData(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordChangePassword = async (
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const resultCreateNewUser = await api(
        PATHS.editUserChangePassword,
        {
          method: "PUT",
          data: {
            phone_number: userData?.phone_number,
            password,
            time_token: 1,
          },
        },
        resultUserDataS
      );

      if (resultCreateNewUser?.result) {
        await setDeviceStorage(
          TOKEN_NAME,
          resultCreateNewUser.userData.verify_token
        );
        setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser.userData });
        setUserDataSocket({
          ...DEFAULT_USER_DATA,
          ...resultCreateNewUser.userData,
        });
      } else info(getErrors(i18n)[resultCreateNewUser?.code || ""]);
      return resultCreateNewUser?.result || false;
    } catch (error: any) {
      bug(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: Context = useMemo(
    () => ({
      userData,
      cleanUserData,
      sendCodeToUser,
      sendVerifyCode,
      editUser,
      meUser,
      exitUser,
      loginUser,
      recoveryPasswordSendCodeToUser,
      recoveryPasswordSendVerifyCode,
      recoveryPasswordChangePassword,
    }),
    [userData]
  );

  useEffect(() => {
    meUser();
  }, []);

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};
