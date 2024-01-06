import { z } from "zod";

export const locationSchema = z.object({
  address_components: z.array(
    z.object({
      long_name: z.string(),
      short_name: z.string(),
      types: z.array(z.string()),
    })
  ),
  adr_address: z.string(),
  formatted_address: z.string(),
  geometry: z.object({
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    viewport: z.object({
      northeast: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      southwest: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
  }),
  icon: z.string(),
  icon_background_color: z.string(),
  icon_mask_base_uri: z.string(),
  name: z.string(),
  place_id: z.string(),
  reference: z.string(),
  types: z.array(z.string()),
  url: z.string(),
  utc_offset: z.number(),
  vicinity: z.string(),
});

export const eventSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  location: locationSchema.nullable(),
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
      width: z.number(),
      height: z.number(),
    })
  ),
});

export const eventsSchema = z.array(eventSchema);

export const resultEventsSchema = z.object({
  result: z.boolean(),
  events: eventsSchema,
  code: z.number(),
});
