import { z } from "zod";
import {
  ipApiGetCountryResponseSchema,
  mapBoundsSchema,
  mapCoordinatesSchema,
  mapLocationSourceSchema,
  mapPointCoordinatesSchema,
  mapPointEventSchema,
  mapPointWorkshopSchema,
  mapPointsResponseSchema,
  mapStateSchema,
} from "./map.schemas";

export type TMapCoordinates = z.infer<typeof mapCoordinatesSchema>;
export type TMapPointCoordinates = z.infer<typeof mapPointCoordinatesSchema>;
export type TMapBounds = z.infer<typeof mapBoundsSchema>;
export type TMapPointEvent = z.infer<typeof mapPointEventSchema>;
export type TMapPointWorkshop = z.infer<typeof mapPointWorkshopSchema>;
export type TMapPointsResponse = z.infer<typeof mapPointsResponseSchema>;
export type TIpApiGetCountryResponse = z.infer<
  typeof ipApiGetCountryResponseSchema
>;
export type TMapLocationSource = z.infer<typeof mapLocationSourceSchema>;
export type TMapState = z.infer<typeof mapStateSchema>;

export type TMapPointsRequest = {
  bounds: TMapBounds;
  types?: Array<"events" | "workshops">;
  userLocation?: TMapPointCoordinates;
  cityLocation?: TMapPointCoordinates;
  includeNearest?: boolean;
};
