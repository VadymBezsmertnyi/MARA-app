import { useCallback, useMemo } from "react";

// types
import { TMapMarker } from "../../../storeRedux/apis/map/map.types";
import type {
  TMapBounds,
  TMapPointsRequest,
} from "../../../storeRedux/apis/map/map.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useMapSelector } from "../../../storeRedux/apis/map/slice";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

type MapLocationSource = "user" | "ip" | "city" | null;

const USER_DELTA = 0.1;
const CITY_DELTA = 0.5;

export const useMapLocation = (): {
  location: TMapMarker | null;
  source: MapLocationSource;
  statusText: string | null;
  isLocationLoading: boolean;
  getMapPointsRequestParams: (
    bounds: TMapBounds,
    options: { includeNearest: boolean }
  ) => TMapPointsRequest;
} => {
  const { language } = useLocalesProvider();
  const { userData } = useUserSelector();
  const { userLocation, ipLocation, sources } = useMapSelector();

  const statusText = useMemo(() => {
    if (!sources.length) return null;
    const hasUser = sources.includes("user");
    const hasIp = sources.includes("ip");
    if (hasUser && hasIp) return "Отримуємо геолокацію...";
    if (hasUser) return "Отримуємо геолокацію користувача...";
    return "Отримуємо геолокацію міста...";
  }, [sources]);

  const isLocationLoading = sources.length > 0;

  const resolved = useMemo(() => {
    if (userLocation)
      return {
        location: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: USER_DELTA,
          longitudeDelta: USER_DELTA,
        },
        source: "user" as const,
      };

    if (ipLocation)
      return {
        location: {
          latitude: ipLocation.latitude,
          longitude: ipLocation.longitude,
          latitudeDelta: CITY_DELTA,
          longitudeDelta: CITY_DELTA,
        },
        source: "ip" as const,
      };

    const cityCoordinates = userData?.place_id?.[language]?.geometry?.location;
    if (
      cityCoordinates &&
      typeof cityCoordinates.lat === "number" &&
      typeof cityCoordinates.lng === "number"
    )
      return {
        location: {
          latitude: cityCoordinates.lat,
          longitude: cityCoordinates.lng,
          latitudeDelta: CITY_DELTA,
          longitudeDelta: CITY_DELTA,
        },
        source: "city" as const,
      };

    return { location: null, source: null };
  }, [userLocation, ipLocation, userData?.place_id, language]);

  const getMapPointsRequestParams = useCallback(
    (
      bounds: TMapBounds,
      options: { includeNearest: boolean }
    ): TMapPointsRequest => {
      const coords =
        resolved.location &&
        (resolved.source === "user" ||
          resolved.source === "ip" ||
          resolved.source === "city")
          ? {
              latitude: resolved.location.latitude,
              longitude: resolved.location.longitude,
            }
          : undefined;

      const request: TMapPointsRequest = {
        bounds,
        includeNearest: options.includeNearest,
      };
      if (resolved.source === "user" && coords) request.userLocation = coords;
      if ((resolved.source === "ip" || resolved.source === "city") && coords)
        request.cityLocation = coords;
      return request;
    },
    [resolved.location, resolved.source]
  );

  return useMemo(
    () => ({
      location: resolved.location,
      source: resolved.source,
      statusText,
      isLocationLoading,
      getMapPointsRequestParams,
    }),
    [
      resolved.location,
      resolved.source,
      statusText,
      isLocationLoading,
      getMapPointsRequestParams,
    ]
  );
};
