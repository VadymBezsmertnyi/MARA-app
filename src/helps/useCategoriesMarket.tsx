import { I18n } from "@lingui/core";
import { z } from "zod";

import jsonBrandsMoto from "../../assets/db/motorcycles/moto_brands.json";
import jsonBrandsAuto from "../../assets/db/cars/car_brands.json";

const dataSchema = z.object({ id: z.number(), name: z.string() });

export const useCategoriesMarket = (i18n: I18n) => {
  const currentBrandsMoto = z
    .object({ data: z.array(dataSchema) })
    .safeParse(jsonBrandsMoto);
  const currentBrandsAuto = z
    .object({ data: z.array(dataSchema) })
    .safeParse(jsonBrandsAuto);

  const mainCategories = [
    {
      id: 1,
      name: i18n._("Motorcycle transport"),
    },
    {
      id: 2,
      name: i18n._("Car transport"),
    },
    {
      id: 3,
      name: i18n._("Motorcycle parts"),
    },
    {
      id: 4,
      name: i18n._("Car parts"),
    },
  ];
  const brandsMoto = currentBrandsMoto.success
    ? currentBrandsMoto.data.data
    : [];
  const brandsAuto = currentBrandsAuto.success
    ? currentBrandsAuto.data.data
    : [];
  const fuelTypes = [
    { id: 1, name: i18n._("Gasoline") },
    { id: 2, name: i18n._("Diesel") },
    { id: 3, name: i18n._("Gas / Petrol") },
    { id: 4, name: i18n._("Electric") },
    { id: 5, name: i18n._("Hybrid") },
    { id: 6, name: i18n._("Other") },
  ];
  const transmissionTypes = [
    { id: 1, name: i18n._("Manual") },
    { id: 2, name: i18n._("Automatic") },
    { id: 3, name: i18n._("Continuously variable transmission (CVT)") },
    { id: 4, name: i18n._("Adaptive") },
    { id: 5, name: i18n._("Tiptronic") },
  ];

  return {
    mainCategories,
    brandsMoto,
    brandsAuto,
    fuelTypes,
    transmissionTypes,
  };
};
