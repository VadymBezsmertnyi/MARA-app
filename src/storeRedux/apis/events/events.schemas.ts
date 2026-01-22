import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";
import { codeCurrenciesSchema } from "../payment/payment.schemas";
import { fileSchema } from "../../schemas";

const populateUserData = z.object({
  _id: z.string(),
  avatarFile: fileSchema.nullable().default(null),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
});

export const eventSchema = z.object({
  _id: z.string(),
  userId: populateUserData.nullable(),
  title: z.string(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  place_address: z.string(),
  coordinates: coordinatesSchema,
  date: z.object({
    start: z.number(),
    finish: z.number(),
  }),
  price: z.object({ start: z.number(), finish: z.number() }).nullable(),
  currency: codeCurrenciesSchema,
  description: z.string(),
  imageFiles: z.array(fileSchema).default([]),
  likeUserIds: z.array(populateUserData),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  code: z.number(),
});

export const eventResponseSchema = z.object({
  event: eventSchema,
});

export const deleteEventResponseSchema = z.object({
  result: z.boolean(),
});

export const addEventRequestSchema = z.object({
  userId: z.string(),
  title: z.string(),
  place_address: z.string().optional(),
  coordinates: coordinatesSchema.optional(),
  date: z.object({
    start: z.number(),
    finish: z.number(),
  }),
  price: z
    .object({ start: z.number(), finish: z.number() })
    .nullable()
    .optional(),
  currency: codeCurrenciesSchema,
  description: z.string(),
  likeUserIds: z.array(z.string()).default([]),
  isNow: z.boolean().optional(),
  isOld: z.boolean().optional(),
  place: z
    .object({
      placeId: z.string(),
      title: z.string(),
      address: z.string().optional(),
      coordinates: coordinatesSchema.optional(),
    })
    .optional(),
});

export const changeEventRequestSchema = addEventRequestSchema.extend({
  _id: z.string(),
});

export const deleteEventRequestSchema = z.object({
  _id: z.string(),
});

export const eventsStateSchema = z.object({
  eventsList: eventsSchema,
  eventsUserList: eventsSchema,
  loading: z.boolean(),
  error: z.string().nullable(),
});
