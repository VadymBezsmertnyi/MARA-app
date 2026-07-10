import { z } from "zod";
import {
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";

export const telegramChannelCategorySchema = z.enum([
  "dispute",
  "community",
  "auto",
  "moto",
  "other",
]);

export const telegramChannelSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  channelUrl: z.string(),
  category: telegramChannelCategorySchema,
  place_id: z.string().optional(),
  country_place_id: z.string().optional(),
  verified: z.boolean(),
  aiVerified: z.boolean(),
  addedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  reportCount: z.number(),
  isActive: z.boolean(),
  lastVerified: z.string().optional(),
  verificationNotes: z.string().optional(),
});

export const telegramChannelCategoryInfoSchema = z.object({
  value: telegramChannelCategorySchema,
  label: z.string(),
  description: z.string(),
});

// Response Schemas
export const telegramChannelsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    channels: z.array(telegramChannelSchema),
    pagination: z.object({
      currentPage: z.number(),
      totalPages: z.number(),
      totalItems: z.number(),
      itemsPerPage: z.number(),
    }),
    filters: z.object({
      place_id: z.string().optional(),
      country_place_id: z.string().optional(),
      category: telegramChannelCategorySchema.optional(),
      verified: z.boolean().or(z.string()).optional(),
    }),
  }),
});

export const telegramCategoriesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(telegramChannelCategoryInfoSchema),
});

export const telegramCountriesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.string()),
});

export const telegramCitiesResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.string()),
});

export const telegramLocationsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    countries: z.array(countryDbSchema).default([]),
    places: z.array(placeDbSchema).default([]),
  }),
});

export const addTelegramChannelRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  channelUrl: z.string(),
  category: telegramChannelCategorySchema,
  place_id: z.string().optional(),
  country_place_id: z.string().optional(),
  addedBy: z.string(),
});

export const reportChannelRequestSchema = z.object({
  reason: z.string(),
  reportedBy: z.string(),
});

export const addTelegramChannelResponseSchema = z.object({
  success: z.boolean(),
  data: telegramChannelSchema,
  message: z.string(),
});

export const reportChannelResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    reportCount: z.number(),
    isActive: z.boolean(),
  }),
});

export type TelegramChannel = z.infer<typeof telegramChannelSchema>;
export type TelegramChannelCategory = z.infer<
  typeof telegramChannelCategorySchema
>;
export type TelegramChannelCategoryInfo = z.infer<
  typeof telegramChannelCategoryInfoSchema
>;
export type TelegramChannelsResponse = z.infer<
  typeof telegramChannelsResponseSchema
>;
export type TelegramCategoriesResponse = z.infer<
  typeof telegramCategoriesResponseSchema
>;
export type TelegramCountriesResponse = z.infer<
  typeof telegramCountriesResponseSchema
>;
export type TelegramCitiesResponse = z.infer<
  typeof telegramCitiesResponseSchema
>;
export type AddTelegramChannelRequest = z.infer<
  typeof addTelegramChannelRequestSchema
>;
export type AddTelegramChannelResponse = z.infer<
  typeof addTelegramChannelResponseSchema
>;
export type ReportChannelRequest = z.infer<typeof reportChannelRequestSchema>;
export type ReportChannelResponse = z.infer<typeof reportChannelResponseSchema>;

export interface TelegramChannelsQueryParams {
  country?: string;
  city?: string;
  category?: TelegramChannelCategory;
  verified?: boolean;
  page?: number;
  limit?: number;
}

export interface TelegramCitiesQueryParams {
  country?: string;
}
