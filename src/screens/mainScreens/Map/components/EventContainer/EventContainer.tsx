import React, { FunctionComponent, useMemo } from "react";
import {
  ColorValue,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { usePlacesProvider } from "../../../../../providers/PlacesProvider/PlacesProvider";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

//types
import { TMapMarker } from "../../../../../storeRedux/apis/map/map.types";
import { TEvent } from "../../../../../storeRedux/apis/events/events.types";

// helps
import { dateToNMY } from "../../../../../helps/helps";

// styles
import { styles } from "./EventContainer.styles";
import colors from "../../../../../../styles/colors";

type EventContainerProps = {
  firstEvent: TEvent | null;
  showFirstEvent: (location: TMapMarker) => void;
};

export const EventContainer: FunctionComponent<EventContainerProps> = ({
  firstEvent,
  showFirstEvent,
}) => {
  const { top } = useSafeAreaInsets();
  const { i18n, language } = useLocalesProvider();
  const { placesDB } = usePlacesProvider();
  const selectCountryTitle = useMemo(() => {
    if (!firstEvent?.place_id) return "";
    return firstEvent.place_id[language].formatted_address;
  }, [placesDB, firstEvent?.place_id]);

  const isDateShow = useMemo(() => {
    if (!firstEvent) return false;
    const dateNow = dayjs().valueOf();
    return dateNow < firstEvent.date.finish;
  }, [firstEvent]);
  const colorsLinearGradient: ColorValue[] = useMemo(
    () => [colors.californiaOrange70, colors.blazeOrange70],
    []
  );
  const startLinearGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endLinearGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsLinearGradient = useMemo(() => [0, 1], []);
  const linearGradientContainerStyles = useMemo(
    () => [
      styles.linearGradientContainer,
      {
        top: 110 + top,
      },
    ],
    [top]
  );

  if (!firstEvent || !isDateShow) return null;

  return (
    <LinearGradient
      colors={colorsLinearGradient}
      start={startLinearGradient}
      end={endLinearGradient}
      locations={locationsLinearGradient}
      style={linearGradientContainerStyles}
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
          <Text style={styles.mainTitle}>{i18n._("The nearest event:")}</Text>
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
