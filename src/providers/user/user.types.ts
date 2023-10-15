import { z } from 'zod';

// types
import type { I18n } from '@lingui/core';
import { KeysAuthorizationT } from '../../screens/AuthorizationScreen/Authorization.types';

// schemas
import { userDataS } from './user.schemas';

export type UserDataT = z.infer<typeof userDataS>;

export type Context = {
  userData: UserDataT | null;
  cleanUserData: () => void;
  sendCodeToUser: (phone_number: string) => Promise<{
    result: boolean;
    isHaveUser: boolean;
  }>;
  sendVerifyCode: (code: string) => Promise<boolean>;
  editUser: (dataRegistration: Record<string, string | number | boolean>) => Promise<void>;
  meUser: () => Promise<void>;
  exitUser: () => Promise<void>;
  loginUser(dataLogin: Record<KeysAuthorizationT, string>): Promise<boolean>;
  recoveryPasswordSendCodeToUser: (phoneNumber: string) => Promise<boolean>;
  recoveryPasswordSendVerifyCode: (code: string) => Promise<boolean>;
  recoveryPasswordChangePassword: (password: string) => Promise<boolean>;
};

export type State = {
  context: Context;
};

export type Props = {
  children: React.ReactNode;
  state?: State;
  i18n: I18n;
};
