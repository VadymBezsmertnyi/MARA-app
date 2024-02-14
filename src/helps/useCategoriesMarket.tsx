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
  const motoParts = [
    {
      id: 1,
      name: i18n._("Batteries"),
    },
    {
      id: 2,
      name: i18n._("Shock absorbers and suspension"),
    },
    {
      id: 3,
      name: i18n._("Variators and reducers"),
    },
    {
      id: 4,
      name: i18n._("Exhaust systems, straight pipes, mufflers"),
    },
    {
      id: 5,
      name: i18n._("Engine parts"),
    },
    {
      id: 6,
      name: i18n._("Gearbox"),
    },
    {
      id: 7,
      name: i18n._("Footrests and pedals"),
    },
    {
      id: 8,
      name: i18n._("Lighting and lamps"),
    },
    {
      id: 9,
      name: i18n._("Bearings"),
    },
    {
      id: 10,
      name: i18n._("Drive and chassis"),
    },
    {
      id: 11,
      name: i18n._("Frame, brackets, and swingarms"),
    },
    {
      id: 12,
      name: i18n._("Handlebars and controls"),
    },
    {
      id: 13,
      name: i18n._("Seat"),
    },
    {
      id: 14,
      name: i18n._("Cooling system"),
    },
    {
      id: 15,
      name: i18n._("Clutch"),
    },
    {
      id: 16,
      name: i18n._("Fuel system"),
    },
    {
      id: 17,
      name: i18n._("Brake system"),
    },
    {
      id: 18,
      name: i18n._("Cables and hoses"),
    },
    {
      id: 19,
      name: i18n._("Filters"),
    },
    {
      id: 20,
      name: i18n._("Chains and sprockets"),
    },
    {
      id: 21,
      name: i18n._("Electrical system"),
    },
    {
      id: 22,
      name: i18n._("Other motorcycle parts"),
    },
  ];
  const autoParts = [
    {
      id: 1,
      name: i18n._("Engine"),
    },
    {
      id: 2,
      name: i18n._("Exhaust system"),
    },
    {
      id: 3,
      name: i18n._("Transmission / Manual and Automatic Transmission"),
    },
    {
      id: 4,
      name: i18n._("Steering system"),
    },
    {
      id: 5,
      name: i18n._("Suspension / Chassis"),
    },
    {
      id: 6,
      name: i18n._("Fuel system"),
    },
    {
      id: 7,
      name: i18n._("Brake system"),
    },
    {
      id: 8,
      name: i18n._("Body parts"),
    },
    {
      id: 9,
      name: i18n._("Interior details"),
    },
    {
      id: 10,
      name: i18n._("Air conditioning, heater, ventilation"),
    },
    {
      id: 11,
      name: i18n._("Air intake system"),
    },
    {
      id: 12,
      name: i18n._("Ignition system"),
    },
    {
      id: 13,
      name: i18n._("Window and headlight cleaning system"),
    },
    {
      id: 14,
      name: i18n._("Headlights and lighting"),
    },
    {
      id: 15,
      name: i18n._("Electrical equipment"),
    },
    {
      id: 16,
      name: i18n._("Filters"),
    },
    {
      id: 17,
      name: i18n._("Automotive glass"),
    },
    {
      id: 18,
      name: i18n._("Liquefied gas system"),
    },
    {
      id: 19,
      name: i18n._("Other types of spare parts"),
    },
  ];

  return {
    mainCategories,
    brandsMoto,
    brandsAuto,
    fuelTypes,
    transmissionTypes,
    motoParts,
    autoParts,
  };
};
