import { z } from "zod";
import {
  infoCategorySchema,
  minMaxPricesSchema,
  productSchema,
  productsSchema,
} from "./MarketProvider.schemas";

export type InfoCategoryType = z.infer<typeof infoCategorySchema>;

export type ProductType = z.infer<typeof productSchema>;
export type ProductsType = z.infer<typeof productsSchema>;

export type MinMaxPricesType = z.infer<typeof minMaxPricesSchema>;
