import { z } from "zod";
import { placeSchema } from "../PlacesProvider/PlacesProvider.schemas";

export const infoCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_id: z.number().optional(),
});

export const transportSchema = z.object({
  brand: infoCategorySchema,
  mileage: z.number(),
  yearRelease: z.number(),
  isCleared: z.boolean(),
  typeFuel: infoCategorySchema,
  typeTransmission: infoCategorySchema,
});

export const partsSchema = z.object({
  brand: infoCategorySchema,
  type: infoCategorySchema,
});

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  isNew: z.boolean(),
  isBusiness: z.boolean(),
  place: placeSchema,
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  description: z.string(),
  price: z.number(),
  codeCurrency: z.string(),
  phoneNumber: z.string(),
  telegram: z.string(),
  moto: transportSchema.nullable(),
  auto: transportSchema.nullable(),
  motoParts: partsSchema.nullable(),
  autoParts: partsSchema.nullable(),
});

export const productsSchema = z.array(productSchema);
