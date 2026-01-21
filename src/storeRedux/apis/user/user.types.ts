import { z } from "zod";
import {
  userDataSchema,
  loginResponseSchema,
  meResponseSchema,
  editUserRequestSchema,
  deleteUserRequestSchema,
  deleteUserResponseSchema,
} from "./user.schemas";

export type TUserData = z.infer<typeof userDataSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
export type TMeResponse = z.infer<typeof meResponseSchema>;
export type TEditUserRequest = z.infer<typeof editUserRequestSchema>;
export type TDeleteUserRequest = z.infer<typeof deleteUserRequestSchema>;
export type TDeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;

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
  body: TEditUserRequest;
}

export interface IDeleteUserRequest {
  body: TDeleteUserRequest;
}
