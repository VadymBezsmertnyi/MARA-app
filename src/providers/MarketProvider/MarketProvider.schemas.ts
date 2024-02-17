import { z } from "zod";
import { placeSchema } from "../PlacesProvider/PlacesProvider.schemas";
import { codeCurrenciesSchema } from "../PaymentProvider/PaymentProvider.schemas";

export const infoCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  brand_id: z.number().optional(),
});

export const transportSchema = z.object({
  brandId: z.number(),
  mileage: z.number(),
  yearRelease: z.number(),
  isCleared: z.boolean(),
  typeFuelId: z.number(),
  typeTransmissionId: z.number(),
});

export const partsSchema = z.object({
  brandId: z.number(),
  typeId: z.number(),
});

export const productSchema = z.object({
  id: z.number(),
  userId: z.number(),
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
  codeCurrency: codeCurrenciesSchema,
  phoneNumber: z.string(),
  telegram: z.string(),
  moto: transportSchema.nullable(),
  auto: transportSchema.nullable(),
  motoParts: partsSchema.nullable(),
  autoParts: partsSchema.nullable(),
  updateAT: z.number(),
  quantityViews: z.number(),
  likeUserIds: z.array(z.number()),
});

export const productsSchema = z.array(productSchema);

export const resultProductsSchema = z.object({
  result: z.boolean(),
  products: productsSchema,
  code: z.number(),
});
