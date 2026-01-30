import { z } from "zod";

export const mapCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable(),
  accuracy: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  speed: z.number().nullable(),
});

export const mapPointCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const mapBoundsSchema = z.object({
  minLat: z.number(),
  maxLat: z.number(),
  minLon: z.number(),
  maxLon: z.number(),
});

const mapPointBaseSchema = z.object({
  _id: z.string(),
  coordinates: mapPointCoordinatesSchema.nullable(),
  title: z.string().optional(),
  imageFiles: z.array(z.any()).optional(),
});

export const mapPointEventSchema = mapPointBaseSchema.extend({
  date: z
    .object({
      start: z.number().optional(),
      finish: z.number().optional(),
    })
    .optional(),
});

export const mapPointWorkshopSchema = mapPointBaseSchema.extend({
  rating: z.number().nullable().optional(),
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
  mapPoints: mapPointsResponseSchema.nullable(),
  mapPointsLoading: z.boolean(),
  loading: z.boolean(),
  error: z.string().nullable(),
});

export const mapPointsResponseSchema = z.object({
  result: z.boolean(),
  events: z.array(mapPointEventSchema),
  workshops: z.array(mapPointWorkshopSchema),
  nearestEvent: mapPointEventSchema.nullable(),
  nearestEventDistance: z.number().nullable(),
  code: z.number(),
});

export const mapMarkerSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  latitudeDelta: z.number(),
  longitudeDelta: z.number(),
});
