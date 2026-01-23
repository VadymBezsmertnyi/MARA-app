import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getTokens, saveTokens } from "./apis/user/user.helpers";
import { PATHS } from "../providers/paths.constants";

const appManifestEnvS = z.object({
  APP_DOMAIN_APP: z.string(),
  APP_DOMAIN_WEB: z.string(),
  APP_PORT: z.string(),
});

type AppManifestEnvT = z.infer<typeof appManifestEnvS>;

export const getEnv = (): AppManifestEnvT => {
  const parsedEnv = z.object({ developer: appManifestEnvS }).parse({
    developer: {
      APP_DOMAIN_WEB: "localhost",
      APP_DOMAIN_APP: "192.168.31.31",
      APP_PORT: "5008",
    },
  });
  return parsedEnv.developer;
};

export const getApiUrl = () => {
  const { APP_DOMAIN_WEB, APP_PORT } = getEnv();
  const appDomainApp = "192.168.50.248";
  const herokuServer = process.env.EXPO_PUBLIC_HEROKU_URL as string;
  const api =
    Platform.OS === "web"
      ? `http://${APP_DOMAIN_WEB}:${APP_PORT}`
      : `http://${appDomainApp}:${APP_PORT}`;
  if (__DEV__) return api;
  return herokuServer;
};

export const getDeviceId = async () => {
  if (Platform.OS === "android") return Application.getAndroidId();

  const deviceId = await SecureStore.getItemAsync("deviceId");
  if (!deviceId) {
    const newDeviceId = await Application.getIosIdForVendorAsync();
    if (newDeviceId) await SecureStore.setItemAsync("deviceId", newDeviceId);

    return newDeviceId;
  }

  return deviceId;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${getApiUrl()}/api`,
  prepareHeaders: async (headers, { getState }) => {
    const tokens = await getTokens();
    if (tokens?.accessToken) headers.set("authorization", tokens.accessToken);

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const platform = Platform.OS;
  const deviceId = await getDeviceId();

  const queryParams = new URLSearchParams({
    platform,
    deviceId: deviceId || "",
  }).toString();

  let modifiedArgs: string | FetchArgs;
  if (typeof args === "string") {
    const separator = args.includes("?") ? "&" : "?";
    modifiedArgs = `${args}${separator}${queryParams}`;
  } else {
    const url = args.url || "";
    const separator = url.includes("?") ? "&" : "?";
    modifiedArgs = {
      ...args,
      url: `${url}${separator}${queryParams}`,
    };
  }

  let result = await baseQuery(modifiedArgs, api, extraOptions);

  if (result.error && result.error.status === 402) {
    const tokens = await getTokens();
    if (tokens?.refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: PATHS.token,
          method: "POST",
          headers: {
            authorization: tokens.refreshToken,
          },
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const newTokens = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        await saveTokens(newTokens);
        if (typeof modifiedArgs === "string")
          result = await baseQuery(modifiedArgs, api, extraOptions);
        else {
          result = await baseQuery(
            {
              ...modifiedArgs,
              headers: {
                ...modifiedArgs.headers,
                authorization: newTokens.accessToken,
              },
            },
            api,
            extraOptions
          );
        }
      } else await saveTokens({ accessToken: "", refreshToken: "" });
    }
  }

  return result;
};
