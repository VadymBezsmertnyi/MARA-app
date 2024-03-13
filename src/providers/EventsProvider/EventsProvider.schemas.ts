import { z } from "zod";
import { coordinatesSchema } from "../PlacesProvider/PlacesProvider.schemas";
import { codeCurrenciesSchema } from "../PaymentProvider/PaymentProvider.schemas";

export const eventSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  place_id: z.string(),
  region_place_id: z.string(),
  country_place_id: z.string(),
  place_address: z.string(),
  coordinates: coordinatesSchema,
  date: z.object({
    start: z.number(),
    finish: z.number(),
  }),
  price: z.object({ start: z.number(), finish: z.number() }).nullable(),
  currency: codeCurrenciesSchema,
  description: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  likeUserIds: z.array(z.number()),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  code: z.number(),
});

export const upcomingEventSchema = eventSchema.merge(
  z.object({
    isOld: z.boolean(),
    isNow: z.boolean(),
  })
);

export const upcomingEventsSchema = z.array(upcomingEventSchema);
