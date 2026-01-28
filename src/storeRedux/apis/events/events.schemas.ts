import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";
import { codeCurrenciesSchema } from "../payment/payment.schemas";
import { fileSchema } from "../../schemas";

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

const populateUserData = z.object({
  _id: z.string(),
  avatarFile: fileSchema.nullable().default(null),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
});

export const contactSchema = z.object({
  type: z.enum([
    "phone",
    "email",
    "viber",
    "telegram",
    "whatsapp",
    "instagram",
    "facebook",
  ]),
  value: z.string(),
});

export const commentEventSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
  dateCreate: z.number().optional(),
  dateUpdate: z.number().optional(),
});

export const eventSchema = z.object({
  _id: z.string(),
  userId: populateUserData.nullable(),
  ownerUserId: populateUserData.nullable().optional(),
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
  comments: z.array(commentEventSchema).default([]),
  rating: z.number().nullable().default(null),
  likeUserIds: z.array(z.string()).default([]),
  goingUserIds: z.array(z.string()).default([]),
  contacts: z.array(contactSchema).default([]),
  verification: z
    .object({
      status: z.enum(["pending", "verified", "rejected"]),
      date: z.number(),
      reason: z.string().nullable().default(null),
    })
    .nullable()
    .optional()
    .default(null),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  pagination: paginationSchema,
  maxDistance: z.number(),
  code: z.number(),
});

export const closestEventsSchema = z.object({
  result: z.boolean(),
  upcomingAndCurrent: eventsSchema,
  past: eventsSchema,
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
  goingUserIds: z.array(z.string()).default([]),
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
  contacts: z.array(contactSchema).default([]).optional(),
});

export const upcomingEventSchema = z.object({
  ...eventSchema.shape,
  isOld: z.boolean(),
  isNow: z.boolean(),
});

export const changeEventRequestSchema = addEventRequestSchema.partial().extend({
  _id: z.string(),
});

export const deleteEventRequestSchema = z.object({
  _id: z.string(),
});

export const addCommentRequestSchema = z.object({
  idEvent: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
});

export const changeCommentRequestSchema = addCommentRequestSchema.extend({
  _id: z.string(),
});

export const addGoingRequestSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
});

export const removeGoingRequestSchema = addGoingRequestSchema;

export const eventsStateSchema = z.object({
  upcomingEventsList: eventsSchema,
  pastEventsList: eventsSchema,
  eventsUserList: eventsSchema,
  upcomingClosest: eventsSchema,
  pastClosest: eventsSchema,
  pagination: paginationSchema.nullable(),
  paginationUser: paginationSchema.nullable(),
  maxDistance: z.number(),
  maxDistanceUser: z.number(),
  loading: z.boolean(),
  error: z.string().nullable(),
});

export const eventLocationsSchema = z.object({
  result: z.boolean(),
  countries: z.array(countryDbSchema),
  places: z.array(placeDbSchema),
  code: z.number(),
});
