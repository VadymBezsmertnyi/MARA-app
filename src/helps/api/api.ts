import { Method, Options, Response } from './api.types';
import env from '../server';
import type http from 'http';
import { defaultLanguage } from '../../../localization/localization.const';
import { ApiError, PermissionError, ValidationError } from '../errors/errors';

export function isValid<T>(
  url: string,
  response: Response<T>,
  token: string | null,
): Response<T> | never {
  if (response.code === 401) {
    throw new PermissionError(`Access denied [${response.code}] to ${url} token:${token}`);
  }
  if (response.status !== 'ok') {
    throw new ValidationError(`${response.code} ${response.data}`, {
      code: response.code,
      data: JSON.stringify(response.data),
    });
  }
  return response;
}

export const sendRequest = async (
  sourceUrl: string,
  method: Method,
  headers: Headers,
  payload: Record<string, unknown> | null = null,
  fetchParams = {},
) => {
  const _uri = sourceUrl.startsWith('http') ? '' : env.api;
  let url = `${_uri}${sourceUrl}`;

  const response = await fetch(
    url,
    Object.assign(
      {},
      {
        method,
        mode: 'cors',
        headers,
        credentials: 'omit',
      },
      {},
      payload && method !== 'GET' ? { body: JSON.stringify(payload) } : {},
      fetchParams,
    ),
  );

  return response;
};

export default async function api<T>(
  url: string,
  lang?: string,
  options?: Options | null,
  headers?: http.OutgoingHttpHeaders,
): Promise<[Response<T>, Headers]> | never {
  try {
    const fetchPath = `${env.api}/api${url}`;

    const request = fetch(
      fetchPath,
      Object.assign(
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': lang || defaultLanguage,
            'Content-Language': lang || defaultLanguage,
            ...headers,
          },
        },
        options,
        options?.body && options?.method !== 'GET' ? { body: JSON.stringify(options.body) } : {},
      ),
    );
    const result = await request;
    let response: Response<T> = null!;

    const resultAuthorization = result.headers.get('authorization') || null;
    response = {
      code: result.status,
      status: result.statusText === 'OK' || result.status === 200 ? 'ok' : 'error',
      data: await result.json(),
    };

    return [isValid(url, response, resultAuthorization), result.headers];
  } catch (e) {
    if (e instanceof ValidationError || e instanceof PermissionError) {
      throw e;
    }

    throw new ApiError(e.message, {
      code: 500,
      data: `${env.api}${url}${url.includes('?') ? `&language=${lang}` : `?language=${lang}`}`,
      stack: e.stack,
    });
  }
}
