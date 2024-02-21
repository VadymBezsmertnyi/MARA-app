import { z } from "zod";
import { placeSchema } from "../PlacesProvider/PlacesProvider.schemas";
import {
  codeCurrenciesSchema,
  currenciesSchema,
  ratesCurrencySchema,
} from "../PaymentProvider/PaymentProvider.schemas";

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
  prices: z.object({
    UAH: z.number().optional(),
    USD: z.number().optional(),
    EUR: z.number().optional(),
    date: z.number().nullable(),
  }),
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

export const placesAllSchema = z.record(
  z.string(),
  z.object({
    countryId: z.string(),
    regions: z.record(
      z.string(),
      z.object({
        regionId: z.string(),
        cities: z.array(z.string()),
      })
    ),
  })
);

export const resultProductsSchema = z.object({
  result: z.boolean(),
  code: z.number(),
  products: productsSchema,
  currencies: currenciesSchema,
  max: ratesCurrencySchema,
  min: ratesCurrencySchema,
  places: placesAllSchema.optional(),
});

export const minMaxPricesSchema = z.object({
  min: ratesCurrencySchema,
  max: ratesCurrencySchema,
});
