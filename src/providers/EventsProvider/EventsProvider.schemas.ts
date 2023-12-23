import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  location: z.string().nullable(),
  date: z.object({
    start: z.number(),
    finish: z.number(),
  }),
  price: z.number(),
  currency: z.enum(["UAH", "EUR", "USD"]),
  description: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
    })
  ),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  code: z.number(),
});
