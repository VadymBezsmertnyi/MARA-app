import { z } from "zod";
import colors from "../../../styles/colors";

export const typeWorkSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const typeWorksSchema = z.array(typeWorkSchema);

export const commentSchema = z.object({
  id: z.number(),
  userId: z.number(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
  dateCreate: z.number(),
  dateUpdate: z.number(),
});

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

export const workshopSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  phoneNumber: z.string(),
  place: placeSchema,
  motoTypesWorks: z.array(z.number()),
  autoTypesWorks: z.array(z.number()),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  dataCreate: z.number(),
  comments: z.array(commentSchema),
  rating: z.number().nullable(),
});

export const workshopsSchema = z.array(workshopSchema);
