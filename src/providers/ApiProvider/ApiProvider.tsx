import React, { FunctionComponent, useMemo } from 'react';
import { I18n } from '@lingui/core';
import { ZodSchema, z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';

// helps
import { getApiUrl } from './ApiProvider.helps';
import showErrors from '../../helps/errors/showError';

type ApiContext = {
  api: <T>(
    url: string,
    config?: AxiosRequestConfig | null,
    schema?: ZodSchema<T>,
  ) => Promise<T | null>;
};

type ApiProviderProps = {
  children: JSX.Element;
};

export const apiContext = React.createContext({} as ApiContext);

export const ApiProvider: FunctionComponent<ApiProviderProps> = props => {
  const { children } = props;
  const urlApi = `${getApiUrl()}/api`;

  async function api<T>(
    url: string,
    config: AxiosRequestConfig | null = { method: 'GET' },
    schema: ZodSchema<T> = z.any(),
  ): Promise<T | null> {
    const currentUrl = url.includes('http') ? url : `${urlApi}${url}`;
    const currentConfig = config ? config : {};
    try {
      const response = await axios(currentUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...currentConfig,
      });

      if (response.status === 204) return null;
      const isCurrent = schema.safeParse(response.data);
      if (isCurrent.success) return isCurrent.data;
      showErrors.bug(isCurrent.error);
      return null;
    } catch (error: any) {
      if (error.response !== null && error.response !== undefined) {
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  const contextValue = useMemo(() => ({ api }), []);

  return <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>;
};
