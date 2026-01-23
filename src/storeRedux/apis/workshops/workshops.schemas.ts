import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";
import { fileSchema } from "../../schemas";

export const typeWorkSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const typeWorksSchema = z.array(typeWorkSchema);

const populateUserData = z.object({
  _id: z.string(),
  avatarFile: fileSchema.nullable().default(null),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
});

export const commentSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
  dateCreate: z.number(),
  dateUpdate: z.number(),
});

export const workshopSchema = z.object({
  _id: z.string(),
  userId: populateUserData.nullable(),
  title: z.string(),
  description: z.string(),
  phoneNumber: z.string(),
  place_id: placeDbSchema.nullable(),
  region_place_id: regionDbSchema.nullable(),
  country_place_id: countryDbSchema.nullable(),
  place_address: z.string(),
  coordinates: coordinatesSchema,
  motoTypesWorks: z.array(z.number()),
  autoTypesWorks: z.array(z.number()),
  imageFiles: z.array(fileSchema).default([]),
  dataCreate: z.number(),
  comments: z.array(commentSchema),
  rating: z.number().nullable(),
  likeUserIds: z.array(populateUserData),
});

export const workshopsSchema = z.array(workshopSchema);

export const resultWorkshopsSchema = z.object({
  result: z.boolean(),
  workshops: workshopsSchema,
  code: z.number(),
});

export const workshopResponseSchema = z.object({
  workshop: workshopSchema,
});

export const deleteWorkshopResponseSchema = z.object({
  result: z.boolean(),
});

export const addWorkshopRequestSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  phoneNumber: z.string(),
  place_address: z.string().optional(),
  coordinates: coordinatesSchema.optional(),
  motoTypesWorks: z.array(z.number()),
  autoTypesWorks: z.array(z.number()),
  likeUserIds: z.array(z.string()).default([]),
  place: z
    .object({
      placeId: z.string(),
      title: z.string(),
      address: z.string().optional(),
      coordinates: coordinatesSchema.optional(),
    })
    .optional(),
});

export const changeWorkshopRequestSchema = addWorkshopRequestSchema.extend({
  _id: z.string(),
});

export const deleteWorkshopRequestSchema = z.object({
  _id: z.string(),
});

export const addCommentRequestSchema = z.object({
  idWorkshop: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
});

export const changeCommentRequestSchema = addCommentRequestSchema.extend({
  _id: z.string(),
});

export const workshopsStateSchema = z.object({
  workshopsList: workshopsSchema,
  workshopsUserList: workshopsSchema,
  loading: z.boolean(),
  error: z.string().nullable(),
});
