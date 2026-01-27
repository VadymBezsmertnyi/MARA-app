import { z } from "zod";

export const locationObjectCoordsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable(),
  accuracy: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  speed: z.number().nullable(),
});

export const ipApiGetCountryResponseSchema = z.object({
  status: z.string(),
  country: z.string(),
  countryCode: z.string(),
  region: z.string().optional(),
  regionName: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  timezone: z.string().optional(),
  isp: z.string().optional(),
  org: z.string().optional(),
  as: z.string().optional(),
  query: z.string().optional(),
});
