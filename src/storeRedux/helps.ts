import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import { z } from "zod";
import qs from "qs";
import { getDeviceStorage } from "../helps/storage.help";
import { TOKEN_KEY_ASYNC_STORAGE } from "../providers/ApiProvider/ApiProvider.constants";
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
  const appDomainApp = "172.20.10.3"; // local ip
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

const getBaseUrl = () => {
  const urlApi = `${getApiUrl()}/api`;
  return urlApi;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: async (headers) => {
    const verifyTokensJSON = await getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
    const verifyTokens = verifyTokensJSON
      ? (JSON.parse(verifyTokensJSON) as {
          accessToken: string;
          refreshToken: string;
        })
      : null;
    if (verifyTokens?.accessToken)
      headers.set("authorization", verifyTokens.accessToken);

    headers.set("Content-Type", "application/json");

    return headers;
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (args && typeof args === "object" && "url" in args) {
    const url = args.url as string;
    if (!url.includes("platform") && !url.includes("deviceId")) {
      const platform = Platform.OS;
      const deviceId = await getDeviceId();
      const queryParams = qs.stringify(
        { platform, deviceId },
        { addQueryPrefix: !url.includes("?") }
      );
      if (queryParams)
        args.url = `${url}${
          url.includes("?") ? `&${queryParams.substring(1)}` : queryParams
        }`;
    }
  }

  let result = await rawBaseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 402)
  ) {
    const verifyTokensJSON = await getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
    const verifyTokens = verifyTokensJSON
      ? (JSON.parse(verifyTokensJSON) as {
          accessToken: string;
          refreshToken: string;
        })
      : null;
    if (verifyTokens?.refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: `${getBaseUrl()}${PATHS.token}`,
          method: "GET",
          headers: {
            authorization: verifyTokens.refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data)
        result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
