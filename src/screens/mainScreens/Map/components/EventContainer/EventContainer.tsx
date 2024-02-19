import React, { FunctionComponent, useContext, useMemo } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

//types
import { mapMarker } from "../../Map.types";
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

// providers
import { eventsContext } from "../../../../../providers/EventsProvider/EventsProvider";

// helps
import { dateToNMY } from "../../../../../helps/helps";

// styles
import { styles } from "./EventContainer.styles";
import colors from "../../../../../../styles/colors";

type EventContainerProps = {
  firstEvent: EventType | null;
  showFirstEvent: (location: mapMarker) => void;
};

export const EventContainer: FunctionComponent<EventContainerProps> = ({
  firstEvent,
  showFirstEvent,
}) => {
  const colorsLinearGradient = useMemo(
    () => [colors.californiaOrange70, colors.blazeOrange70],
    []
  );
  const startLinearGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endLinearGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsLinearGradient = useMemo(() => [0, 1], []);

  if (!firstEvent) return null;

  return (
    <LinearGradient
      colors={colorsLinearGradient}
      start={startLinearGradient}
      end={endLinearGradient}
      locations={locationsLinearGradient}
      style={styles.linearGradientContainer}
    >
      <TouchableOpacity
        onPress={() => {
          if (firstEvent.place?.coordinates)
            showFirstEvent({
              longitude: firstEvent.place?.coordinates.longitude,
              latitude: firstEvent.place?.coordinates.latitude,
              latitudeDelta: 0,
              longitudeDelta: 0.01,
            });
        }}
      >
        {Platform.OS !== "android" ? (
          <BlurView
            intensity={5}
            tint="dark"
            style={styles.blurViewContainer}
          />
        ) : null}
        <View style={styles.container}>
          <Text style={styles.title}>{firstEvent.title}</Text>
          <Text style={styles.subTitle}>
            {dateToNMY(new Date(firstEvent.date.start))}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
