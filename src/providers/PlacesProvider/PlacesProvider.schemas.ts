import { z } from "zod";

export const namePlaceSchema = z.object({
  uk: z.string(),
  en: z.string(),
});
export const regionCountrySchema = z.object({
  id: z.number(),
  name: namePlaceSchema,
  placeId: z.string(),
  cities: z
    .array(
      z.object({
        id: z.number(),
        name: namePlaceSchema,
        placeId: z.string(),
        isShow: z.boolean(),
      })
    )
    .nullable(),
  isShow: z.boolean(),
});
export const regionsCountrySchema = z.array(regionCountrySchema);

export const countrySchema = z.object({
  id: z.number(),
  title: z.string(),
  regions: regionsCountrySchema,
  isShow: z.boolean(),
});

export const countriesSchema = z.record(countrySchema);

export const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const placeSchema = z.object({
  countryId: z.number(),
  regionPlaceId: z.string(),
  city: z.string(),
  address: z.string(),
  coordinates: coordinatesSchema,
});
