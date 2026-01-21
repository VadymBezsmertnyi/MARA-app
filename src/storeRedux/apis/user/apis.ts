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
import {
  loginResponseSchema,
  meResponseSchema,
  deleteUserResponseSchema,
} from "./user.schemas";

export const loginFacebook = (builder: Builder) =>
  builder.mutation<TLoginResponse | null, ILoginFacebookRequest>({
    query: (body) => ({
      url: PATHS.loginFacebook,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = loginResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod loginFacebook:", {
          url: PATHS.loginFacebook,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const loginGoogle = (builder: Builder) =>
  builder.mutation<TLoginResponse | null, ILoginGoogleRequest>({
    query: (body) => ({
      url: PATHS.loginGoogle,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = loginResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod loginGoogle:", {
          url: PATHS.loginGoogle,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const loginApple = (builder: Builder) =>
  builder.mutation<TLoginResponse | null, ILoginAppleRequest>({
    query: (body) => ({
      url: PATHS.loginApple,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = loginResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod loginApple:", {
          url: PATHS.loginApple,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getMe = (builder: Builder) =>
  builder.query<TMeResponse | null, void>({
    query: () => ({
      url: PATHS.me,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = meResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getMe:", {
          url: PATHS.me,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const editUser = (builder: Builder) =>
  builder.mutation<TLoginResponse | null, IEditUserRequest>({
    query: ({ body }) => ({
      url: PATHS.editUser,
      method: "PUT",
      body: {
        ...body,
        time_token: 1,
      },
    }),
    transformResponse: (response: unknown) => {
      const result = loginResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod editUser:", {
          url: PATHS.editUser,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const deleteUser = (builder: Builder) =>
  builder.mutation<TDeleteUserResponse | null, IDeleteUserRequest>({
    query: ({ body }) => ({
      url: PATHS.delete,
      method: "POST",
      body,
    }),
    transformResponse: (response: unknown) => {
      const result = deleteUserResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod deleteUser:", {
          url: PATHS.delete,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
