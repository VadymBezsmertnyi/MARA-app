import { z } from "zod";
import {
  placeSchema,
  countriesSchema,
  regionsCountrySchema,
  countrySchema,
} from "./PlacesProvider.schemas";

export type RegionsCountryType = z.infer<typeof regionsCountrySchema>;
export type CountryType = z.infer<typeof countrySchema>;
export type CountriesType = z.infer<typeof countriesSchema>;

export type PlaceType = z.infer<typeof placeSchema>;
