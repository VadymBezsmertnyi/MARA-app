import { z } from "zod";

export const mapCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable().optional(),
  accuracy: z.number().nullable().optional(),
  altitudeAccuracy: z.number().nullable().optional(),
  heading: z.number().nullable().optional(),
  speed: z.number().nullable().optional(),
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

export const mapLocationSourceSchema = z.enum(["user", "ip"]);

export const mapStateSchema = z.object({
  location: mapCoordinatesSchema.nullable(),
  userLocation: mapCoordinatesSchema.nullable(),
  ipLocation: mapCoordinatesSchema.nullable(),
  source: mapLocationSourceSchema.nullable(),
  sources: z.array(mapLocationSourceSchema),
  loading: z.boolean(),
  error: z.string().nullable(),
});
