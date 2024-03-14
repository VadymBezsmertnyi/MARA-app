import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import { Trans } from "@lingui/macro";

// providers
import { placesContext } from "../../../../../providers/PlacesProvider/PlacesProvider";
import { localesContext } from "../../../../../../localization/localization.provider";

//types
import { mapMarker } from "../../Map.types";
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

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
  const { language } = useContext(localesContext);
  const { placesDB, getPlace } = useContext(placesContext);
  const selectCountryTitle = useMemo(() => {
    if (!firstEvent) return "";
    const placeDB = getPlace(firstEvent.place_id);
    if (!placeDB) return "";
    return placeDB[language].formatted_address;
  }, [placesDB, firstEvent?.place_id]);

  const isDateShow = useMemo(() => {
    if (!firstEvent) return false;
    const dateNow = dayjs().valueOf();
    return dateNow < firstEvent.date.finish;
  }, [firstEvent]);
  const colorsLinearGradient = useMemo(
    () => [colors.californiaOrange70, colors.blazeOrange70],
    []
  );
  const startLinearGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endLinearGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsLinearGradient = useMemo(() => [0, 1], []);

  if (!firstEvent || !isDateShow) return null;

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
          if (firstEvent.coordinates)
            showFirstEvent({
              longitude: firstEvent.coordinates.longitude,
              latitude: firstEvent.coordinates.latitude,
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
          <Text style={styles.mainTitle}>
            <Trans>The nearest event:</Trans>
          </Text>
          <Text style={styles.title}>{firstEvent.title}</Text>
          <Text style={styles.subTitle}>{selectCountryTitle}</Text>
          <Text style={styles.dateTitle}>
            {dateToNMY(new Date(firstEvent.date.start))}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};
