import { Builder } from "../../api";
import {
  TLoginResponse,
  TMeResponse,
  TEditUserRequest,
  TDeleteUserResponse,
  ILoginFacebookRequest,
  ILoginGoogleRequest,
  ILoginAppleRequest,
  IEditUserRequest,
  IDeleteUserRequest,
} from "./user.types";
import { PATHS } from "../../constants/paths.constants";

export const loginFacebook = (builder: Builder) =>
  builder.mutation<TLoginResponse, ILoginFacebookRequest>({
    query: (body) => ({
      url: PATHS.loginFacebook,
      method: "POST",
      body,
    }),
  });

export const loginGoogle = (builder: Builder) =>
  builder.mutation<TLoginResponse, ILoginGoogleRequest>({
    query: (body) => ({
      url: PATHS.loginGoogle,
      method: "POST",
      body,
    }),
  });

export const loginApple = (builder: Builder) =>
  builder.mutation<TLoginResponse, ILoginAppleRequest>({
    query: (body) => ({
      url: PATHS.loginApple,
      method: "POST",
      body,
    }),
  });

export const getMe = (builder: Builder) =>
  builder.query<TMeResponse, void>({
    query: () => ({
      url: PATHS.me,
      method: "GET",
    }),
  });

export const editUser = (builder: Builder) =>
  builder.mutation<TLoginResponse, IEditUserRequest>({
    query: ({ body }) => ({
      url: PATHS.editUser,
      method: "PUT",
      body: {
        ...body,
        time_token: 1,
      },
    }),
  });

export const deleteUser = (builder: Builder) =>
  builder.mutation<TDeleteUserResponse, IDeleteUserRequest>({
    query: ({ body }) => ({
      url: PATHS.delete,
      method: "POST",
      body,
    }),
  });
