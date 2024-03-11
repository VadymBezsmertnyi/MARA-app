import { z } from "zod";
import {
  placeSchema,
  countriesSchema,
  regionsCountrySchema,
  countrySchema,
  getSearchPlaceSchema,
  countryDbSchema,
} from "./PlacesProvider.schemas";

export type RegionsCountryType = z.infer<typeof regionsCountrySchema>;
export type CountryType = z.infer<typeof countrySchema>;
export type CountriesType = z.infer<typeof countriesSchema>;

export type PlaceType = z.infer<typeof placeSchema>;

export type GetSearchPlaceType = z.infer<typeof getSearchPlaceSchema>;

export type CountryDbType = z.infer<typeof countryDbSchema>;
