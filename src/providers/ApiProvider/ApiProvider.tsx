import React, { FunctionComponent, JSX, useContext, useMemo } from "react";
import { Platform } from "react-native";
import { ZodSchema, z } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

// helps
import { getApiUrl, getDeviceId } from "./ApiProvider.helps";
import { getDeviceStorage } from "../../helps/storage.help";

// constants
import { TOKEN_KEY_ASYNC_STORAGE } from "./ApiProvider.constants";
import { PATHS } from "../paths.constants";

type ApiContext = {
  api: <T>(
    url: string,
    config?: AxiosRequestConfig | null,
    schema?: ZodSchema<T>
  ) => Promise<T | null>;
};

type ApiProviderProps = {
  children: React.ReactNode;
};

export const apiContext = React.createContext({} as ApiContext);

const ApiProvider: FunctionComponent<ApiProviderProps> = (props) => {
  const { children } = props;
  const urlApi = `${getApiUrl()}/api`;

  async function api<T>(
    url: string,
    config: AxiosRequestConfig | null = { method: "GET" },
    schema: ZodSchema<T> = z.any()
  ): Promise<T | null> {
    const platform = Platform.OS;
    const deviceId = await getDeviceId();
    const verifyTokensJSON = await getDeviceStorage(TOKEN_KEY_ASYNC_STORAGE);
    const verifyTokens = verifyTokensJSON
      ? (JSON.parse(verifyTokensJSON) as {
          accessToken: string;
          refreshToken: string;
        })
      : null;
    const queryParams = qs.stringify(
      { platform, deviceId },
      {
        addQueryPrefix: !url.includes("?"),
      }
    );
    const currentUrl = url.includes("http")
      ? url
      : `${urlApi}${url}${url.includes("?") ? `&${queryParams}` : queryParams}`;
    const currentConfig = config ? config : {};

    try {
      const isFormData = currentConfig.data instanceof FormData;
      const response = await axios(currentUrl, {
        headers: {
          ...(isFormData
            ? {}
            : { "Content-Type": "application/json" }),
          authorization: verifyTokens?.accessToken || "",
        },
        ...currentConfig,
      });
      if (response.status === 204) return null;

      // TODO for test
      const isCurrent = schema.safeParse(response.data);
      if (isCurrent.success) return isCurrent.data;
      /* console.warn("currentUrl", currentUrl);
      console.warn("response.data", response.data);
      console.warn("isCurrent", isCurrent); */
      console.warn("error zod:", {
        currentUrl,
        data: response.data,
        isCurrent,
      });

      return null;
    } catch (error: any) {
      try {
        if (error.status === 402 && verifyTokens?.refreshToken) {
          const currentUrlToken = url.includes("http")
            ? url
            : `${urlApi}${PATHS.token}`;
          const isFormData = currentConfig.data instanceof FormData;
          const responseOther = await axios(currentUrlToken, {
            headers: {
              ...(isFormData
                ? {}
                : { "Content-Type": "application/json" }),
              authorization: verifyTokens.refreshToken,
            },
            ...currentConfig,
          });
          const isCurrent = schema.safeParse(responseOther.data);
          if (isCurrent.success) {
            return isCurrent.data;
          }
          console.warn("error-402-currentUrl: ", {
            currentUrl,
            data: responseOther.data,
            isCurrent,
          });
          return null;
        }
        if (__DEV__)
          console.warn("error: ", { error, currentUrl, currentConfig });
      } catch (error402) {
        if (__DEV__)
          console.warn("error-402-verifyTokens?.refreshToken", {
            error402,
            currentUrl,
          });

        throw error402;
      }
      throw error;
    }
  }

  const contextValue = useMemo(() => ({ api }), []);

  return (
    <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>
  );
};

export const useApiProvider = () => useContext(apiContext);

export default ApiProvider;
