import { z } from "zod";
import {
  telegramChannelSchema,
  telegramChannelCategorySchema,
  telegramChannelCategoryInfoSchema,
  telegramChannelsResponseSchema,
  telegramCategoriesResponseSchema,
  telegramCountriesResponseSchema,
  telegramCitiesResponseSchema,
  addTelegramChannelRequestSchema,
  addTelegramChannelResponseSchema,
  reportChannelRequestSchema,
  reportChannelResponseSchema,
} from "./telegram-channels.schemas";

// Infer types from Zod schemas
export type TTelegramChannel = z.infer<typeof telegramChannelSchema>;
export type TTelegramChannelCategory = z.infer<
  typeof telegramChannelCategorySchema
>;
export type TTelegramChannelCategoryInfo = z.infer<
  typeof telegramChannelCategoryInfoSchema
>;
export type TTelegramChannelsResponse = z.infer<
  typeof telegramChannelsResponseSchema
>;
export type TTelegramCategoriesResponse = z.infer<
  typeof telegramCategoriesResponseSchema
>;
export type TTelegramCountriesResponse = z.infer<
  typeof telegramCountriesResponseSchema
>;
export type TTelegramCitiesResponse = z.infer<
  typeof telegramCitiesResponseSchema
>;
export type TAddTelegramChannelRequest = z.infer<
  typeof addTelegramChannelRequestSchema
>;
export type TAddTelegramChannelResponse = z.infer<
  typeof addTelegramChannelResponseSchema
>;
export type TReportChannelRequest = z.infer<typeof reportChannelRequestSchema>;
export type TReportChannelResponse = z.infer<
  typeof reportChannelResponseSchema
>;

// Request interfaces (following events pattern)
export interface IGetTelegramChannelsRequest {
  place_id?: string;
  country_place_id?: string;
  category?: TTelegramChannelCategory;
  verified?: boolean;
  page?: number;
  limit?: number;
}

export interface IGetTelegramCitiesRequest {
  country_place_id?: string;
}

export interface IAddTelegramChannelRequest
  extends TAddTelegramChannelRequest {}

export interface IReportChannelRequest {
  channelId: string;
  reportData: TReportChannelRequest;
}
