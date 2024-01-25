import { z } from "zod";

// types
import type { I18n } from "@lingui/core";

// schemas
import { userDataS } from "./user.schemas";
import { User } from "@react-native-google-signin/google-signin";

export type UserDataT = z.infer<typeof userDataS>;

export type Context = {
  userData: UserDataT | null;
  cleanUserData: () => void;
  editUser: (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null
    >
  ) => Promise<boolean>;
  meUser: () => Promise<UserDataT | null>;
  exitUser: () => Promise<boolean>;
  signInGoogle: (userData: User) => Promise<UserDataT | null>;
  signInFacebook: (accessToken: string) => Promise<UserDataT | null>;
  deleteUser: () => Promise<boolean>;
};

export type State = {
  context: Context;
};

export type Props = {
  children: React.ReactNode;
  state?: State;
  i18n: I18n;
};
