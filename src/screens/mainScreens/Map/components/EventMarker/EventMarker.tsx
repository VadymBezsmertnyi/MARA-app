import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Callout, Marker } from "react-native-maps";

// types
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

// helps
import { dateToNMY } from "../../../../../helps/helps";
import { useAllNavigation } from "../../../../../navigators/Navigators.helps";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// styles
import { styles } from "./EventMarker.styles";
import { Trans } from "@lingui/macro";

type EventMarkerProps = {
  longitude: number;
  latitude: number;
  event: EventType;
};

export const EventMarker: FunctionComponent<EventMarkerProps> = ({
  longitude,
  latitude,
  event,
}) => {
  const navigation = useAllNavigation();
  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude]
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <View style={styles.container}>
        <View style={styles.firstCircle} />
        <View style={styles.secondCircle} />
        <View style={styles.thirdCircle} />
      </View>
      <Callout>
        <View style={{ width: 200 }}>
          <Text>{event.title}</Text>
          <Text>{dateToNMY(new Date(event.date.start))}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(PATHS_EVENTS_SCREENS.eventItem, {
                eventId: event.id,
              });
            }}
          >
            <Text>
              <Trans>more detail</Trans>
            </Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};
