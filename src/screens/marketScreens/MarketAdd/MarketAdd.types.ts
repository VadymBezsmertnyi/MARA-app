import {
  NAME_BRAND_AUTO,
  NAME_BRAND_MOTO,
  NAME_MAIN_CATEGORIES,
  NAME_TYPE_FUEL,
  NAME_TYPE_TRANSMISSION,
} from "./MarketAdd.constants";

export type TypeModalCategories =
  | typeof NAME_MAIN_CATEGORIES
  | typeof NAME_TYPE_FUEL
  | typeof NAME_TYPE_TRANSMISSION
  | typeof NAME_BRAND_AUTO
  | typeof NAME_BRAND_MOTO;

export type TypeDataCategory = { id: number; name: string; brand_id?: number };
