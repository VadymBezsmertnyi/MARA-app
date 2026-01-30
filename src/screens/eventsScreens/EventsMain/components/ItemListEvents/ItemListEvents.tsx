import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getDistance } from "geolib";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

// types
import { RootEventsScreensParamList } from "../../../../../navigators/Navigators.types";
import { TEvent } from "../../../../../storeRedux/apis/events/events.types";

// redux
import { useMapSelector } from "../../../../../storeRedux/apis/map/slice";

// provider
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { usePlacesProvider } from "../../../../../providers/PlacesProvider/PlacesProvider";

// hooks
import { formatDateFromUnixTimestamp } from "../../../../../helps/helps";

// components
import { ImageCache } from "../../../../../components/ImageCache/ImageCache";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";

// constants
import { PATHS_EVENTS_SCREENS } from "../../../../../navigators/useNavigator.constants";

// icons
import {
  IconChat,
  IconLocationMarker,
  IconStar,
} from "../../../../../icons/components";

// styles
import { styles } from "./ItemListEvents.styles";
import colors from "../../../../../../styles/colors";

type EventListItemProps = {
  item: TEvent;
  navigation: NativeStackNavigationProp<RootEventsScreensParamList>;
};

export const EventListItem: FunctionComponent<EventListItemProps> = ({
  item,
  navigation,
}) => {
  const { location } = useMapSelector();
  const { i18n, language } = useLocalesProvider();
  const { placesDB } = usePlacesProvider();
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
    () => (item.imageFiles[0] ? item.imageFiles[0].url : null),
    [item.imageFiles]
  );
  const distance = useMemo(
    () =>
      location && item.coordinates
        ? getDistance(location, {
            longitude: item.coordinates.longitude,
            latitude: item.coordinates.latitude,
          })
        : null,
    [location, item.coordinates]
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
  const showTitlePlace = useMemo(() => {
    const placeDB = item.place_id;
    if (!placeDB) return "";
    return placeDB[language].formatted_address;
  }, [placesDB, item.place_id]);
  const commentsCount = item.comments?.length || 0;
  const goingCount = item.goingUserIds?.length || 0;

  const selectEvent = () => {
    navigation.navigate(PATHS_EVENTS_SCREENS.eventItem, {
      eventId: item._id,
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
            {showTitlePlace}
          </Text>
        </View>
      </View>
      <View style={partStyles}>
        {isNow ? (
          <LinearGradientCustom style={styles.containerNowLabel}>
            <Text style={styles.titleNowLabel}>{i18n._("Now")}</Text>
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
        {commentsCount > 0 || goingCount > 0 ? (
          <View style={styles.statsRow}>
            {commentsCount > 0 && item.rating ? (
              <View style={styles.comment}>
                <View style={styles.inner}>
                  <IconChat
                    width={12}
                    height={12}
                    fill={colors.californiaOrange}
                  />
                  <Text style={styles.infoText}>{commentsCount}</Text>
                </View>
                <View style={styles.inner}>
                  <IconStar width={12} height={12} fill={colors.yellow} />
                  <Text style={styles.infoText}>{item.rating}</Text>
                </View>
              </View>
            ) : null}
            {goingCount > 0 ? (
              <View style={styles.inner}>
                <MaterialIcons
                  name="groups"
                  size={12}
                  color={colors.californiaOrange}
                />
                <Text style={styles.infoText}>{goingCount}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
