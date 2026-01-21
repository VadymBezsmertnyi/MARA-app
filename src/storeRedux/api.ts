import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helps";
import {
  loginFacebook,
  loginGoogle,
  loginApple,
  getMe,
  editUser,
  deleteUser,
} from "./apis/user/apis";

export type Builder = EndpointBuilder<
  BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError>,
  never,
  "api"
>;

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    // User APIs
    loginFacebook: loginFacebook(builder),
    loginGoogle: loginGoogle(builder),
    loginApple: loginApple(builder),
    getMe: getMe(builder),
    editUser: editUser(builder),
    deleteUser: deleteUser(builder),
  }),
});
