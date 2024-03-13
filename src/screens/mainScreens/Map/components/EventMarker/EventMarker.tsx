import React, { FunctionComponent } from "react";
import { Callout, Marker } from "react-native-maps";
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
        params: { eventId: number };
      };
    }>
  >();
  const distance =
    location && event.coordinates
      ? getDistance(location, {
          longitude: event.coordinates.longitude,
          latitude: event.coordinates.latitude,
        })
      : null;

  if (!event.coordinates) return null;
  return (
    <Marker coordinate={event.coordinates}>
      <IconEventMap width={44} height={44} />
      <Callout
        tooltip
        onPress={() => {
          navigation.navigate(PATHS_MAIN_TABS.events, {
            screen: PATHS_EVENTS_SCREENS.eventItem,
            params: {
              eventId: event.id,
            },
          });
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
