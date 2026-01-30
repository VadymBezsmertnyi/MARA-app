import { z } from "zod";
import {
  ipApiGetCountryResponseSchema,
  mapCoordinatesSchema,
  mapLocationSourceSchema,
  mapStateSchema,
} from "./map.schemas";

export type TMapCoordinates = z.infer<typeof mapCoordinatesSchema>;
export type TIpApiGetCountryResponse = z.infer<
  typeof ipApiGetCountryResponseSchema
>;
export type TMapLocationSource = z.infer<typeof mapLocationSourceSchema>;
export type TMapState = z.infer<typeof mapStateSchema>;
