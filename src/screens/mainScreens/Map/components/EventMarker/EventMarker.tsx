import React, { FunctionComponent, useRef } from "react";
import { Callout, MapMarker, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LocationObjectCoords } from "expo-location";
import { convertDistance, getDistance } from "geolib";

// types
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

// components
import { ComponentCalloutEvent } from "../ComponentCalloutEvent/ComponentCalloutEvent";

// icons
import { IconEventMap } from "../../../../../icons/components";

// constants
import {
  PATHS_EVENTS_SCREENS,
  PATHS_MAIN_TABS,
} from "../../../../../navigators/useNavigator.constants";

type EventMarkerProps = {
  event: EventType;
  location: LocationObjectCoords | null;
};

export const EventMarker: FunctionComponent<EventMarkerProps> = ({
  event,
  location,
}) => {
  const navigation = useNavigation<
    NativeStackNavigationProp<{
      [PATHS_MAIN_TABS.events]?: {
        screen: string;
        params: { eventId: string; isMap: boolean };
      };
    }>
  >();
  const refCallout = useRef<MapMarker>(null);

  const distance =
    location && event.coordinates
      ? getDistance(location, {
          longitude: event.coordinates.longitude,
          latitude: event.coordinates.latitude,
        })
      : null;

  if (!event.coordinates) return null;
  return (
    <Marker ref={refCallout} coordinate={event.coordinates}>
      <IconEventMap width={44} height={44} />
      <Callout
        tooltip
        onPress={() => {
          if (!event._id) return;
          navigation.navigate(PATHS_MAIN_TABS.events, {
            screen: PATHS_EVENTS_SCREENS.eventItem,
            params: {
              eventId: event._id,
              isMap: true,
            },
          });
          refCallout.current?.hideCallout();
        }}
      >
        <ComponentCalloutEvent
          title={event.title}
          distance={distance ? convertDistance(distance, "km").toFixed() : null}
          date={event.date.start}
        />
      </Callout>
    </Marker>
  );
};
