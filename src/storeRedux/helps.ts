import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";
import qs from "qs";
import {
  getApiUrl,
  getDeviceId,
} from "../providers/ApiProvider/ApiProvider.helps";
import { getDeviceStorage } from "../helps/storage.help";
import { TOKEN_KEY_ASYNC_STORAGE } from "../providers/ApiProvider/ApiProvider.constants";
import { PATHS } from "../providers/paths.constants";

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

    if (verifyTokens?.accessToken) {
      headers.set("authorization", verifyTokens.accessToken);
    }
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
  // Add platform and deviceId to query params if not already present
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

  // If we get a 401/402, try to refresh the token
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

      if (refreshResult.data) {
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};
