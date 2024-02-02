import { z } from "zod";
import { placesSchema, regionsCountrySchema } from "./PlacesProvider.schemas";

export type RegionsCountryType = z.infer<typeof regionsCountrySchema>;
export type PlacesType = z.infer<typeof placesSchema>;
