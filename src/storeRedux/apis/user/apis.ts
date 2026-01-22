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
    query: ({ body, existingUserData }) => {
      const avatarFile = body.avatarFile;
      const hasNewAvatarFile = avatarFile && avatarFile.uri;
      const isDeleteAvatar = avatarFile === null;
      const existingAvatarUrl = isDeleteAvatar
        ? null
        : existingUserData?.avatarFile?.url;
      const formData = new FormData();
      if (hasNewAvatarFile)
        formData.append("avatarFile", {
          uri: avatarFile.uri,
          type: "image/jpeg",
          name: "avatar.jpg",
        } as any);
      else if (isDeleteAvatar) formData.append("avatarFile", null as any);

      const { avatarFile: _, ...bodyWithoutAvatar } = body;
      Object.keys({ ...existingUserData, ...bodyWithoutAvatar }).forEach(
        (key) => {
          if (key !== "avatarFile" && key !== "avatar") {
            const value =
              key === "time_token"
                ? 1
                : bodyWithoutAvatar[key as keyof typeof bodyWithoutAvatar] !==
                  undefined
                ? bodyWithoutAvatar[key as keyof typeof bodyWithoutAvatar]
                : (existingUserData as any)?.[key];
            if (value !== undefined && value !== null) {
              if (
                typeof value === "object" &&
                !Array.isArray(value) &&
                !(value instanceof Date)
              )
                formData.append(key, JSON.stringify(value));
              else if (Array.isArray(value))
                formData.append(key, JSON.stringify(value));
              else formData.append(key, String(value));
            }
          }
        }
      );
      if (existingAvatarUrl && !isDeleteAvatar && !hasNewAvatarFile)
        formData.append(
          "avatarUrl",
          JSON.stringify({ url: existingAvatarUrl })
        );

      return {
        url: PATHS.editUser,
        method: "PUT",
        body: formData,
      };
    },
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
