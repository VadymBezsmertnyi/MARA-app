import { z } from "zod";
import { Linking } from "react-native";
import { Builder } from "../../api";
import { PATHS } from "../../../providers/paths.constants";
import { ipApiGetCountryResponseSchema } from "./map.schemas";
import { TMapCoordinates } from "./map.types";
import * as Location from "expo-location";

const INTERVAL_GET_LOCATION = 15000;

const normalizeIpCoordinates = (
  data: z.infer<typeof ipApiGetCountryResponseSchema>
): TMapCoordinates | null => {
  if (typeof data.lat !== "number" || typeof data.lon !== "number") return null;
  return {
    latitude: data.lat,
    longitude: data.lon,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };
};

export const getIpLocation = (builder: Builder) =>
  builder.query<TMapCoordinates | null, void>({
    query: () => ({
      url: PATHS.ipApiGetCountry,
      method: "GET",
    }),
    transformResponse: (response: unknown) => {
      const result = ipApiGetCountryResponseSchema.safeParse(response);
      if (result.success) {
        if (result.data.status !== "success") {
          if (__DEV__)
            console.warn("error getIpLocation: status is not success", {
              url: PATHS.ipApiGetCountry,
              data: result.data,
            });
          return null;
        }
        const coords = normalizeIpCoordinates(result.data);
        if (coords) return coords;
        if (__DEV__)
          console.warn("error getIpLocation: missing coordinates", {
            url: PATHS.ipApiGetCountry,
            data: result.data,
          });
        return null;
      }
      if (__DEV__)
        console.warn("error zod getIpLocation:", {
          url: PATHS.ipApiGetCountry,
          data: response,
          error: result.error,
        });
      return null;
    },
  });

export const getUserLocation = (builder: Builder) =>
  builder.query<TMapCoordinates | null, { userId: string }>({
    queryFn: async ({ userId }) => {
      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          mayShowUserSettingsDialog: true,
          timeInterval: INTERVAL_GET_LOCATION,
          distanceInterval: 1,
        });

        return {
          data: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude ?? null,
            altitudeAccuracy: coords.altitudeAccuracy ?? null,
            heading: coords.heading ?? null,
            speed: coords.speed ?? null,
          },
        };
      } catch (error) {
        if (__DEV__)
          console.warn("error getUserLocation:", {
            userId,
            error,
          });
        return {
          error: {
            status: "CUSTOM_ERROR",
            error: "getUserLocation failed",
          } as any,
        };
      }
    },
  });

export const openLocationSettings = (builder: Builder) =>
  builder.mutation<boolean, void>({
    queryFn: async () => {
      try {
        await Linking.openSettings();
        return { data: true };
      } catch (error) {
        if (__DEV__)
          console.warn("error openLocationSettings:", {
            error,
          });
        return {
          error: {
            status: "CUSTOM_ERROR",
            error: "openLocationSettings failed",
          } as any,
        };
      }
    },
  });
