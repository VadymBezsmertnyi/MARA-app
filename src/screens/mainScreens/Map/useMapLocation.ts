import { useMemo } from "react";

// types
import { mapMarker } from "./Map.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useMapSelector } from "../../../storeRedux/apis/map/slice";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

type MapLocationSource = "user" | "ip" | "city" | null;

const USER_DELTA = 0.1;
const CITY_DELTA = 0.5;

export const useMapLocation = (): {
  location: mapMarker | null;
  source: MapLocationSource;
} => {
  const { language } = useLocalesProvider();
  const { userData } = useUserSelector();
  const { userLocation, ipLocation } = useMapSelector();

  return useMemo(() => {
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
};
