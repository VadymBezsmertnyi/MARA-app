import { TMapBounds } from "./map.types";

/** Конвертує регіон карти (lat, lng, deltas) у bounds для API */
export const regionToBounds = (region: {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}): TMapBounds => ({
  minLat: region.latitude - region.latitudeDelta / 2,
  maxLat: region.latitude + region.latitudeDelta / 2,
  minLon: region.longitude - region.longitudeDelta / 2,
  maxLon: region.longitude + region.longitudeDelta / 2,
});
