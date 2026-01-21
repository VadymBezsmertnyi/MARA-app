import { z } from "zod";

// schemas
import { userDataS } from "./UserProvider.schemas";
import { User } from "@react-native-google-signin/google-signin";

export type UserDataT = z.infer<typeof userDataS>;

export type Context = {
  userData: UserDataT | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDataT | null>>;
  cleanUserData: () => void;
  editUser: (
    newInfoUser: Record<
      string,
      string | number | boolean | Record<string, any> | null | undefined
    >
  ) => Promise<boolean>;
  meUser: (isLoading: boolean) => Promise<UserDataT | null>;
  exitUser: () => Promise<boolean>;
  signInGoogle: (userData: User) => Promise<UserDataT | null>;
  signInFacebook: (accessToken: string) => Promise<UserDataT | null>;
  signInApple: (identityToken: string) => Promise<UserDataT | null>;
  deleteUser: () => Promise<boolean>;
  setIsChangeAvatar: React.Dispatch<React.SetStateAction<boolean>>;
};

export type State = {
  context: Context;
};

export type Props = {
  children: React.ReactNode;
  state?: State;
};
