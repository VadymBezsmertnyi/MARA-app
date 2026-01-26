import { z } from "zod";
import {
  coordinatesSchema,
  countryDbSchema,
  placeDbSchema,
  regionDbSchema,
} from "../../../providers/PlacesProvider/PlacesProvider.schemas";
import { fileSchema } from "../../schemas";

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

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

export const commentWorkshopSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  userName: z.string(),
  description: z.string(),
  rating: z.number().min(1).max(5),
  dateCreate: z.number().optional(),
  dateUpdate: z.number().optional(),
});

export const dayWorkingHoursSchema = z
  .object({
    open: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
    close: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  })
  .nullable();

export const workingHoursSchema = z
  .object({
    monday: dayWorkingHoursSchema,
    tuesday: dayWorkingHoursSchema,
    wednesday: dayWorkingHoursSchema,
    thursday: dayWorkingHoursSchema,
    friday: dayWorkingHoursSchema,
    saturday: dayWorkingHoursSchema,
    sunday: dayWorkingHoursSchema,
  })
  .default({
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: null,
    sunday: null,
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
  comments: z.array(commentWorkshopSchema).default([]),
  rating: z.number().nullable(),
  likeUserIds: z.array(populateUserData),
  verification: z
    .object({
      status: z.enum(["pending", "verified", "rejected"]),
      date: z.number(),
      reason: z.string().nullable().default(null),
    })
    .nullable()
    .optional()
    .default(null),
  workingHours: workingHoursSchema,
  contacts: z.array(contactSchema).default([]),
});

export const workshopsSchema = z.array(workshopSchema);

export const resultWorkshopsSchema = z.object({
  result: z.boolean(),
  workshops: workshopsSchema,
  pagination: paginationSchema,
  maxDistance: z.number(),
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
  workingHours: workingHoursSchema.optional(),
  contacts: z.array(contactSchema).default([]).optional(),
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
  pagination: paginationSchema.nullable(),
  paginationUser: paginationSchema.nullable(),
  maxDistance: z.number().default(5),
  maxDistanceUser: z.number().default(5),
  loading: z.boolean(),
  error: z.string().nullable(),
});
