import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./helps";

export type Builder = EndpointBuilder<
  BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError>,
  never,
  "api"
>;

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
