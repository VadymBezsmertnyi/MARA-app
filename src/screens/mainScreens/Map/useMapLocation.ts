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
  statusText: string | null;
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
        statusText,
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
        statusText,
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
        statusText,
      };

    return { location: null, source: null, statusText };
  }, [userLocation, ipLocation, userData?.place_id, language, statusText]);
};
