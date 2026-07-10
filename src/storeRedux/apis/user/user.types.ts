import { z } from "zod";
import { ImagePickerAsset } from "expo-image-picker";
import {
  userDataSchema,
  loginResponseSchema,
  meResponseSchema,
  editUserRequestSchema,
  deleteUserRequestSchema,
  deleteUserResponseSchema,
  userStateSchema,
  userStatsResponseSchema,
} from "./user.schemas";

export type TUserData = z.infer<typeof userDataSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
export type TMeResponse = z.infer<typeof meResponseSchema>;
export type TEditUserRequest = z.infer<typeof editUserRequestSchema>;
export type TDeleteUserRequest = z.infer<typeof deleteUserRequestSchema>;
export type TDeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
export type TUserStatsResponse = z.infer<typeof userStatsResponseSchema>;
export type TUserState = z.infer<typeof userStateSchema>;

export interface ILoginFacebookRequest {
  accessToken: string;
}

export interface ILoginGoogleRequest {
  idToken: string;
}

export interface ILoginAppleRequest {
  identityToken: string;
}

export interface IEditUserRequest {
  body: TEditUserRequest & {
    avatarFile?: ImagePickerAsset | null;
  };
  existingUserData?: TUserData | null;
}

export interface IDeleteUserRequest {
  body: TDeleteUserRequest;
}
