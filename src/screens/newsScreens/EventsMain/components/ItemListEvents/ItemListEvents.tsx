import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getDistance } from "geolib";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Trans } from "@lingui/macro";

// types
import { RootEventsScreensParamList } from "../../../../../navigators/Navigators.types";
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

// provider
import { mapContext } from "../../../../../providers/MapProvider/MapProvider";
import { localesContext } from "../../../../../../localization/localization.provider";

// hooks
import { formatDateFromUnixTimestamp } from "../../../../../helps/helps";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import { IconLocationMarker } from "../../../../../icons/components";

// styles
import { styles } from "./ItemListEvents.styles";
import colors from "../../../../../../styles/colors";

type ItemListEventsProps = {
  item: EventType;
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
};

export const ItemListEvents: FunctionComponent<ItemListEventsProps> = ({
  item,
  navigation,
}) => {
  const { location } = useContext(mapContext);
  const { i18n } = useContext(localesContext);
  const nowDate = new Date().getTime();
  const isOld = useMemo(
    () => item.date.finish < nowDate,
    [item.date.finish, nowDate]
  );
  const isNow = useMemo(
    () => item.date.finish > nowDate && item.date.start < nowDate,
    [item.date, nowDate]
  );
  const image = useMemo(
    () => (item.images[0] ? item.images[0].url : null),
    [item.images]
  );
  const distance = useMemo(
    () =>
      location && item.location?.geometry.location
        ? getDistance(location, {
            longitude: item.location.geometry.location.lng,
            latitude: item.location.geometry.location.lat,
          })
        : null,
    [location, item.location]
  );
  const containerStyles = useMemo(
    () => [
      styles.container,
      isOld && styles.containerOld,
      isNow && styles.containerNow,
    ],
    [isOld, isNow]
  );
  const partStyles = useMemo(
    () => [styles.part, isNow && styles.partNow],
    [isNow]
  );

  const selectEvent = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventItem, {
      eventId: item.id,
    });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={selectEvent}>
      <View style={styles.containerLeft}>
        {image ? <ImageCache style={styles.image} imageSrc={image} /> : null}
        <View
          style={
            image ? styles.containerTitles : styles.containerTitlesNotImage
          }
        >
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {item.location?.formatted_address}
          </Text>
        </View>
      </View>
      <View style={partStyles}>
        {isNow ? (
          <LinearGradientCustom style={styles.containerNowLabel}>
            <Text style={styles.titleNowLabel}>
              <Trans>Now</Trans>
            </Text>
          </LinearGradientCustom>
        ) : (
          <Text>{formatDateFromUnixTimestamp(item.date.start)}</Text>
        )}
        <View style={styles.containerLocation}>
          <IconLocationMarker
            width={15}
            height={15}
            fill={colors.californiaOrange}
          />
          <Text numberOfLines={2} style={styles.distance}>
            {distance
              ? `${(distance / 1000).toFixed()} км`
              : i18n._(`Not enabled location`)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
