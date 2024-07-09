import React, { FunctionComponent, useMemo } from "react";
import { Platform } from "react-native";
import { ZodSchema, z } from "zod";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

// helps
import { getApiUrl, getDeviceId } from "./ApiProvider.helps";
import { getDeviceStorage } from "../../helps/storage.help";

// constants
import { TOKEN_NAME } from "../UserProvider/UserProvider.constants";
import { PATHS } from "../paths.constants";

type ApiContext = {
  api: <T>(
    url: string,
    config?: AxiosRequestConfig | null,
    schema?: ZodSchema<T>
  ) => Promise<T | null>;
};

type ApiProviderProps = {
  children: JSX.Element;
};

export const apiContext = React.createContext({} as ApiContext);

export const ApiProvider: FunctionComponent<ApiProviderProps> = (props) => {
  const { children } = props;
  const urlApi = `${getApiUrl()}/api`;

  async function api<T>(
    url: string,
    config: AxiosRequestConfig | null = { method: "GET" },
    schema: ZodSchema<T> = z.any()
  ): Promise<T | null> {
    const platform = Platform.OS;
    const deviceId = await getDeviceId();
    const verifyToken = await getDeviceStorage(TOKEN_NAME);
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
      const response = await axios(currentUrl, {
        headers: {
          "Content-Type": "application/json",
          ...(verifyToken !== null && { authorization: verifyToken }),
        },
        ...currentConfig,
      });

      if (response.status === 204) return null;
      if (response.status === 4010 && verifyToken) {
        const currentUrlToken = url.includes("http")
          ? url
          : `${urlApi}${PATHS.token}`;
        const response = await axios(currentUrlToken, {
          headers: {
            "Content-Type": "application/json",
            ...(verifyToken !== null && { authorization: verifyToken }),
          },
          ...currentConfig,
        });
        const isCurrent = schema.safeParse(response.data);
        if (isCurrent.success) return isCurrent.data;
        return null;
      }

      // TODO for test
      const isCurrent = schema.safeParse(response.data);
      if (isCurrent.success) return isCurrent.data;
      console.warn("currentUrl", currentUrl);
      console.warn("response.data", response.data);
      console.warn("isCurrent", isCurrent);

      return null;
    } catch (error: any) {
      if (__DEV__) {
        console.warn("error", error);
      }
      return null;
    }
  }

  const contextValue = useMemo(() => ({ api }), []);

  return (
    <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>
  );
};
