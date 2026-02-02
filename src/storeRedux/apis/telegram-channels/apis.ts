import { Builder } from "../../api";
import {
  TTelegramChannelsResponse,
  TTelegramCategoriesResponse,
  TTelegramCountriesResponse,
  TTelegramCitiesResponse,
  TAddTelegramChannelResponse,
  TReportChannelResponse,
  IGetTelegramChannelsRequest,
  IGetTelegramCitiesRequest,
  IAddTelegramChannelRequest,
  IReportChannelRequest,
} from "./telegram-channels.types";
import {
  telegramChannelsResponseSchema,
  telegramCategoriesResponseSchema,
  telegramCountriesResponseSchema,
  telegramCitiesResponseSchema,
  addTelegramChannelResponseSchema,
  reportChannelResponseSchema,
} from "./telegram-channels.schemas";

const buildTelegramChannelsQueryString = (
  params: IGetTelegramChannelsRequest
): string => {
  const queryParams: string[] = [];
  if (params.place_id)
    queryParams.push(`place_id=${encodeURIComponent(params.place_id)}`);
  if (params.country_place_id)
    queryParams.push(
      `country_place_id=${encodeURIComponent(params.country_place_id)}`
    );
  if (params.category) queryParams.push(`category=${params.category}`);
  if (params.verified !== undefined)
    queryParams.push(`verified=${params.verified}`);
  if (params.page !== undefined) queryParams.push(`page=${params.page}`);
  if (params.limit !== undefined) queryParams.push(`limit=${params.limit}`);

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

const buildTelegramCitiesQueryString = (
  params: IGetTelegramCitiesRequest
): string => {
  const queryParams: string[] = [];
  if (params.country_place_id)
    queryParams.push(
      `country_place_id=${encodeURIComponent(params.country_place_id)}`
    );

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

export const getTelegramChannels = (builder: Builder) =>
  builder.query<TTelegramChannelsResponse | null, IGetTelegramChannelsRequest>({
    query: (params = {}) => ({
      url: `/telegram-channels${buildTelegramChannelsQueryString(params)}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = telegramChannelsResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getTelegramChannels:", {
          url: "/telegram-channels",
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getTelegramCategories = (builder: Builder) =>
  builder.query<TTelegramCategoriesResponse | null, void>({
    query: () => ({
      url: "/telegram-channels/categories",
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = telegramCategoriesResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getTelegramCategories:", {
          url: "/telegram-channels/categories",
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getTelegramCountries = (builder: Builder) =>
  builder.query<TTelegramCountriesResponse | null, void>({
    query: () => ({
      url: "/telegram-channels/countries",
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = telegramCountriesResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getTelegramCountries:", {
          url: "/telegram-channels/countries",
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getTelegramCities = (builder: Builder) =>
  builder.query<TTelegramCitiesResponse | null, IGetTelegramCitiesRequest>({
    query: (params = {}) => ({
      url: `/telegram-channels/cities${buildTelegramCitiesQueryString(params)}`,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = telegramCitiesResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod getTelegramCities:", {
          url: "/telegram-channels/cities",
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const addTelegramChannel = (builder: Builder) =>
  builder.mutation<
    TAddTelegramChannelResponse | null,
    IAddTelegramChannelRequest
  >({
    query: (channelData) => ({
      url: "/telegram-channels",
      method: "POST",
      body: channelData,
    }),
    transformResponse: (response: unknown) => {
      const result = addTelegramChannelResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod addTelegramChannel:", {
          url: "/telegram-channels",
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const reportTelegramChannel = (builder: Builder) =>
  builder.mutation<TReportChannelResponse | null, IReportChannelRequest>({
    query: ({ channelId, reportData }) => ({
      url: `/telegram-channels/${channelId}/report`,
      method: "POST",
      body: reportData,
    }),
    transformResponse: (response, _meta, { channelId }) => {
      const result = reportChannelResponseSchema.safeParse(response);
      if (result.success) return result.data;
      if (__DEV__)
        console.warn("error zod reportTelegramChannel:", {
          url: `/telegram-channels/${channelId}/report`,
          data: response,
          error: result.error,
        });
      return null;
    },
  });
