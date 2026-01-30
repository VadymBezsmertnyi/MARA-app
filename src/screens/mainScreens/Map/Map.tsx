import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import MapViewCluster from "react-native-map-clustering";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";

// types
import { RootMainTabsParamList } from "../../../navigators/Navigators.types";
import {
  TMapMarker,
  TMapPointEvent,
  TMapPointWorkshop,
} from "../../../storeRedux/apis/map/map.types";

// redux
import { useLazyGetMapPointsQuery } from "../../../storeRedux/api";
import { useMapSelector } from "../../../storeRedux/apis/map/slice";

// providers
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { EventMarker } from "./components/EventMarker/EventMarker";
import { MeMarker } from "./components/MeMarker/MeMarker";
import { UpContainer } from "./components/UpContainer/UpContainer";
import { EventContainer } from "./components/EventContainer/EventContainer";
import { WorkshopMarker } from "./components/WorkshopMarker/WorkshopMarker";

// hooks
import { useMapLocation } from "./useMapLocation";
import { regionToBounds } from "../../../storeRedux/apis/map/map.helpers";

// styles
import { styles } from "./Map.styles";

const MAP_POINTS_THROTTLE_MS = 1200;

type MapProps = {
  navigation: NativeStackNavigationProp<RootMainTabsParamList>;
};

const DEFAULT_LOCATION: TMapMarker = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent<MapProps> = () => {
  const { location, mapPoints } = useMapSelector();
  const { theme, heightStatusBar } = useThemeProvider();
  const [getMapPoints] = useLazyGetMapPointsQuery();
  const {
    location: hookLocation,
    statusText,
    isLocationLoading,
    getMapPointsRequestParams,
  } = useMapLocation();
  const refMap = useRef<MapView>(null);
  const [hasUserMoved, setHasUserMoved] = useState(false);
  const lastFirstFetchKeyRef = useRef<string | null>(null);
  const lastMapPointsAtRef = useRef<number>(0);

  const mapEvents = useMemo(
    (): TMapPointEvent[] =>
      (mapPoints?.events ?? []).filter(
        (event) => (event.date?.finish ?? 0) > dayjs().valueOf()
      ),
    [mapPoints?.events]
  );
  const mapWorkshops = useMemo(
    (): TMapPointWorkshop[] => mapPoints?.workshops ?? [],
    [mapPoints?.workshops]
  );
  const nearestEvent: TMapPointEvent | null = mapPoints?.nearestEvent ?? null;

  const fetchMapPoints = useCallback(
    (
      bounds: {
        minLat: number;
        maxLat: number;
        minLon: number;
        maxLon: number;
      },
      includeNearest: boolean
    ) => {
      getMapPoints(getMapPointsRequestParams(bounds, { includeNearest }));
    },
    [getMapPoints, getMapPointsRequestParams]
  );

  const handleRegionChangeComplete = useCallback(
    (region: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }) => {
      const now = Date.now();
      if (now - lastMapPointsAtRef.current < MAP_POINTS_THROTTLE_MS) return;
      lastMapPointsAtRef.current = now;
      const bounds = regionToBounds(region);
      fetchMapPoints(bounds, false);
    },
    [fetchMapPoints]
  );

  const showFirstEvent = (location: TMapMarker) => {
    if (refMap.current)
      refMap.current.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
  };

  useEffect(() => {
    if (!hookLocation || hasUserMoved || !refMap.current) return;
    refMap.current.animateToRegion(hookLocation);
  }, [hookLocation, hasUserMoved]);

  useEffect(() => {
    if (isLocationLoading || !hookLocation) return;
    const key = `${hookLocation.latitude.toFixed(
      5
    )}-${hookLocation.longitude.toFixed(5)}`;
    if (lastFirstFetchKeyRef.current === key) return;
    lastFirstFetchKeyRef.current = key;
    const bounds = regionToBounds(hookLocation);
    fetchMapPoints(bounds, true);
  }, [hookLocation, isLocationLoading, fetchMapPoints]);

  return (
    <View style={styles.container}>
      {statusText ? (
        <View style={[styles.statusContainer, { top: heightStatusBar + 12 }]}>
          <ActivityIndicator size="small" color="#2E7D32" />
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      ) : null}
      <MapViewCluster
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "ios" ? "terrain" : "standard"}
        initialRegion={DEFAULT_LOCATION}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsIndoorLevelPicker={false}
        onPanDrag={() => {
          if (!hasUserMoved) setHasUserMoved(true);
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        <MeMarker />
        {mapEvents.map((eventItem) =>
          eventItem?.coordinates ? (
            <EventMarker
              key={`marker-event-${eventItem._id}`}
              location={location}
              event={eventItem}
            />
          ) : null
        )}
        {mapWorkshops.map((workshop) => (
          <WorkshopMarker
            key={`marker-workshop-${workshop._id}`}
            workshop={workshop}
            location={location}
          />
        ))}
      </MapViewCluster>
      <UpContainer />
      <EventContainer
        firstEvent={nearestEvent}
        showFirstEvent={showFirstEvent}
      />
    </View>
  );
};
