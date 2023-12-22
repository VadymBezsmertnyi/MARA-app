import { z } from "zod";

// types
import type { I18n } from "@lingui/core";
import { KeysAuthorizationT } from "../../screens/Authorization/Authorization.types";

// schemas
import { userDataS } from "./user.schemas";

export type UserDataT = z.infer<typeof userDataS>;

export type Context = {
  userData: UserDataT | null;
  cleanUserData: () => void;
  registrationPhone: (phone_number: string) => Promise<UserDataT | null>;
  editUser: (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, string | number | boolean>
    >
  ) => Promise<boolean>;
  meUser: () => Promise<boolean>;
  exitUser: () => Promise<void>;
  loginUser(dataLogin: Record<KeysAuthorizationT, string>): Promise<boolean>;
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
