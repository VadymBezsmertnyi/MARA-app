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
    const currentlyPhoneNumber = phone_number.replaceAll(" ", "");
    try {
      const resultCreateNewUser = await api(
        PATHS.addPhone,
        {
          method: "POST",
          data: {
            phone_number: currentlyPhoneNumber,
          },
        },
        resultUserDataS
      );

      setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser?.userData });
      setUserDataSocket({
        ...DEFAULT_USER_DATA,
        ...resultCreateNewUser?.userData,
      });

      return resultCreateNewUser?.userData || null;
    } catch (error: any) {
      bug(error);
      throw error;
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
      registrationPhone,
      cleanUserData,
      editUser,
      meUser,
      exitUser,
      loginUser,
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
