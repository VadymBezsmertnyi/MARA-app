import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getDistance } from "geolib";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootNewsScreensParamList } from "../../../../../navigators/Navigators.types";
import { EventType } from "../../../../../providers/EventsProvider/EventsProvider.types";

// provider
import { mapContext } from "../../../../../providers/MapProvider/MapProvider";
import { localesContext } from "../../../../../../localization/localization.provider";

// hooks
import { formatDateFromUnixTimestamp } from "../../../../../helps/helps";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";

// constants
import { PATHS_NEWS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import { IconLocationMarker } from "../../../../../icons/components";

// styles
import { styles } from "./ItemListEvents.styles";
import colors from "../../../../../../styles/colors";

type ItemListEventsProps = {
  item: EventType;
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const ItemListEvents: FunctionComponent<ItemListEventsProps> = ({
  item,
  navigation,
}) => {
  const { location } = useContext(mapContext);
  const { i18n } = useContext(localesContext);
  const image = item.images[0] ? item.images[0].url : null;
  const distance =
    location && item.location?.geometry.location
      ? getDistance(location, {
          longitude: item.location.geometry.location.lng,
          latitude: item.location.geometry.location.lat,
        })
      : null;

  const selectEvent = () => {
    navigation.navigate(PATHS_NEWS_SCREENS.eventItem, {
      eventId: item.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selectEvent}>
      <View style={styles.containerLeft}>
        {image ? (
          <ImageCache
            style={styles.image}
            contentFit="contain"
            imageSrc={image}
          />
        ) : null}
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
      <View style={styles.part}>
        <Text>{formatDateFromUnixTimestamp(item.date.start)}</Text>
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
