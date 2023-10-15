import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import QueryString from 'qs';
import { t } from '@lingui/macro';

// types
import type { FunctionComponent } from 'react';
import type { Props, Context, UserDataT } from './user.types';
import { KeysAuthorizationT } from '../../screens/Authorization/Authorization.types';

// schemas
import { shortResponseS } from '../source.schemas';
import { resultUserDataS } from './user.schemas';

// providers
import { appContext } from '../app/app.provider';
import { loadingContext } from '../loading/loading.provider';

// helps
import showErrors from '../../helps/errors/showError';
import { getErrors } from '../../helps/errors/errors.helps';
import { deleteDeviceStorage, getDeviceStorage, setDeviceStorage } from '../../helps/storage.help';

// constants
import { DEFAULT_USER_DATA } from './user.constants';
import { PATHS } from '../paths.constants';
import { TOKEN_NAME } from './user.constants';

export const userContext = createContext<Context>({} as Context);

export const UserProvider: FunctionComponent<Props> = props => {
  const { i18n } = props;
  const { api } = useContext(appContext);
  const { setLoading } = useContext(loadingContext);
  const { info, bug, warning } = showErrors;
  const [userData, setUserData] = useState<UserDataT | null>(null);

  const cleanUserData = () => {
    setUserData(null);
  };

  const registrationPhone = async (phone_number: string): Promise<UserDataT> => {
    try {
      const resultCreateNewUser = await api(
        PATHS.addPhone,
        {
          method: 'POST',
          body: {
            phone_number,
          },
        },
        resultUserDataS,
      );
      return resultCreateNewUser.data.userData;
    } catch (error: any) {
      bug(error);
      throw error;
    }
  };

  const sendCodeToUser = async (
    phone_number: string,
  ): Promise<{ result: boolean; isHaveUser: boolean }> => {
    try {
      setLoading(true);
      const currentlyPhoneNumber = phone_number.replaceAll(' ', '');
      const resultCreateNewUser = await registrationPhone(currentlyPhoneNumber);
      if (resultCreateNewUser.is_password)
        return { result: false, isHaveUser: resultCreateNewUser.is_password };
      await api(
        PATHS.sendCodeToUser,
        {
          method: 'POST',
          body: { phone_number },
        },
        shortResponseS,
      );
      setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser });
      return { result: true, isHaveUser: resultCreateNewUser.is_password };
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
          method: 'POST',
          body: {
            userId: userData?.id,
            phone_number: userData?.phone_number,
            code,
          },
        },
        resultUserDataS,
      );
      if (resultSendCode.data.result) {
        setUserData({ ...DEFAULT_USER_DATA, ...resultSendCode.data.userData });
        return true;
      }
      warning(t(i18n)`Code incorrect`);
      return resultSendCode.data.result;
    } catch (error: any) {
      bug(error);
      setUserData(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (
    newInfoUser: Record<string, string | number | boolean>,
  ): Promise<void> => {
    if (userData)
      try {
        setLoading(true);
        const resultCreateNewUser = await api(
          PATHS.editUser,
          {
            method: 'PUT',
            body: {
              ...userData,
              ...newInfoUser,
              time_token: 1,
            },
          },
          resultUserDataS,
        );

        if (resultCreateNewUser.data.result) {
          await setDeviceStorage(TOKEN_NAME, resultCreateNewUser.data.userData.verify_token);
          setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser.data.userData });
        } else info(getErrors(i18n)[resultCreateNewUser.data.code]);
      } catch (error: any) {
        console.log('error', error);
        bug(error);
        throw error;
      } finally {
        setLoading(false);
      }
    else info(t(i18n)`Access denied`);
  };

  const meUser = async (): Promise<boolean> => {
    try {
      const verifyToken = await getDeviceStorage(TOKEN_NAME);
      const queryParams = QueryString.stringify({ verifyToken }, { addQueryPrefix: true });
      const url = `${PATHS.me}${queryParams}`;
      if (verifyToken) {
        setLoading(true);
        const result = await api(url, undefined, resultUserDataS);
        if (result.data.result) {
          const userData = { ...DEFAULT_USER_DATA, ...result.data.userData };
          setUserData(userData);
          return true;
        }
        showErrors.warning(getErrors(i18n)[result.data.code]);
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
    } catch (error: any) {
      if (error instanceof Error) {
        showErrors.bug(error);
      } else showErrors.warning(error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (dataLogin: Record<KeysAuthorizationT, string>): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(PATHS.login, { method: 'POST', body: dataLogin }, resultUserDataS);
      if (result.data.result) {
        await setDeviceStorage(TOKEN_NAME, result.data.userData.verify_token);
        const userData = { ...DEFAULT_USER_DATA, ...result.data.userData };
        info(`Welcome ${userData.first_name} ${userData.family_name}`);
        setUserData(userData);
        return true;
      }
      info(getErrors(i18n)[result.data.code]);
      return false;
    } catch (error: any) {
      bug(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordSendCodeToUser = async (phone_number: string): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.sendCodeToUser,
        {
          method: 'POST',
          body: { phone_number },
        },
        shortResponseS,
      );
      setUserData(state => ({ ...DEFAULT_USER_DATA, ...state, phone_number }));
      return result.data.result;
    } catch (error: any) {
      bug(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordSendVerifyCode = async (code: string): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.verifyCodePhoneRecoveryPassword,
        {
          method: 'POST',
          body: {
            userId: userData?.id,
            phone_number: userData?.phone_number,
            code,
          },
        },
        shortResponseS,
      );
      if (result.data.result)
        setUserData(state => ({ ...DEFAULT_USER_DATA, ...state, is_verified: true }));
      else warning(t(i18n)`Code incorrect`);
      return result.data.result;
    } catch (error: any) {
      bug(error);
      setUserData(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recoveryPasswordChangePassword = async (password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const resultCreateNewUser = await api(
        PATHS.editUserChangePassword,
        {
          method: 'PUT',
          body: { phone_number: userData?.phone_number, password, time_token: 1 },
        },
        resultUserDataS,
      );

      if (resultCreateNewUser.data.result) {
        await setDeviceStorage(TOKEN_NAME, resultCreateNewUser.data.userData.verify_token);
        setUserData({ ...DEFAULT_USER_DATA, ...resultCreateNewUser.data.userData });
      } else info(getErrors(i18n)[resultCreateNewUser.data.code]);
      return resultCreateNewUser.data.result;
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
    [userData],
  );

  useEffect(() => {
    meUser();
  }, []);

  return <userContext.Provider value={contextValue}>{props.children}</userContext.Provider>;
};
