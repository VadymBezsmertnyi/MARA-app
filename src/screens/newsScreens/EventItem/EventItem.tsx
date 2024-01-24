import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { convertDistance, getDistance } from "geolib";
import { Trans } from "@lingui/macro";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// helps
import { dateToNMY, getTimeFromMilliseconds } from "../../../helps/helps";

// icons
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";

// components
import { Map } from "../../../components/Map/Map";
import {
  IconLocationMarker,
  RadixIconsCash,
  RadixIconsCalendar,
  MingcuteTimeLine,
} from "../../../icons/components";

// styles
import { styles } from "./EventItem.styles";
import colors from "../../../../styles/colors";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel.Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Lorem ipsum dolor sit amet consectetur. Orci sit rutrum vestibulum turpis tempus nulla arcu vel. Orci sit rutrum vestibulum turpis tempus nulla arcu vel.";
const SEPARATED_TEXT = LOREM_IPSUM.split(".");

type EventItemProps = {
  route: RouteProp<RootAllScreensParamList, keyof RootAllScreensParamList>;
};

export const EventItem: FunctionComponent<EventItemProps> = ({ route }) => {
  const { i18n } = useContext(localesContext);
  const { eventsList } = useContext(eventsContext);
  const { location } = useContext(mapContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [isFullDescription, setIsFullDescription] = useState(false);
  const eventSelect = useMemo(
    () =>
      route.params?.eventId
        ? eventsList.find((event) => event.id === route.params?.eventId) || null
        : null,
    [route.params]
  );
  const firstImage = useMemo(
    () => (eventSelect?.images.length ? eventSelect.images[0] : null),
    [eventSelect]
  );
  const distance = useMemo(
    () =>
      location && eventSelect?.location?.geometry.location
        ? getDistance(location, {
            longitude: eventSelect.location.geometry.location.lng,
            latitude: eventSelect.location.geometry.location.lat,
          })
        : null,
    [location, eventSelect]
  );
  const showDescription = useMemo(() => {
    if (!eventSelect) return null;
    if (!isFullDescription) return `${eventSelect.description.slice(0, 300)}. `;
    return eventSelect.description;
  }, [eventSelect, isFullDescription]);
  const showPrice = useMemo(() => {
    if (eventSelect?.price?.start && eventSelect.price.finish)
      return i18n._(`{priceStart}-{priceFinish} grn.`, {
        priceStart: eventSelect.price.start,
        priceFinish: eventSelect.price.finish,
      });
    else if (eventSelect?.price?.start)
      return i18n._(`{price} grn.`, { price: eventSelect.price.start });
    return i18n._("Free");
  }, []);
  const containerStyles = useMemo(
    () => ({ ...styles.container, paddingBottom: tabBarHeight || 0 }),
    [tabBarHeight]
  );
  console.log("eventSelect", eventSelect, distance);

  useEffect(() => {
    if (eventSelect && eventSelect.description.length > 300)
      setIsFullDescription(false);
    else setIsFullDescription(true);
  }, []);

  if (!eventSelect) return null;

  return (
    <ScrollView>
      <View style={containerStyles}>
        <View style={styles.imageWrapper}>
          {firstImage ? (
            <ImageCache
              style={styles.image}
              contentFit="cover"
              imageSrc={firstImage.url}
            />
          ) : (
            <View />
          )}
          {firstImage ? (
            <TouchableOpacity style={styles.buttonAllImage}>
              <Text style={styles.titleAllImage}>
                <Trans>All photos</Trans>
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{eventSelect.title}</Text>
          <Text style={styles.subtitle}>
            {dateToNMY(new Date(eventSelect.date.start))}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text numberOfLines={2} style={styles.locationTitle}>
            {eventSelect.location?.formatted_address}
          </Text>
          <View style={styles.distance}>
            <IconLocationMarker
              width={20}
              height={20}
              fill={colors.californiaOrange}
            />
            <Text style={styles.subtitle}>
              {distance
                ? `${convertDistance(distance, "km").toFixed(2)} км`
                : ""}
            </Text>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.titleOther}>{i18n._("Date of the event")}</Text>
          <Text style={styles.label}>{i18n._("The beginning")}:</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCalendar
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.subtitle}>
                {dateToNMY(new Date(eventSelect.date.start))}
              </Text>
            </View>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <MingcuteTimeLine
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.subtitle}>
                {getTimeFromMilliseconds(eventSelect.date.start)}
              </Text>
            </View>
          </View>
          <Text style={styles.label}>{i18n._("Finish")}:</Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCalendar
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.subtitle}>
                {dateToNMY(new Date(eventSelect.date.finish))}
              </Text>
            </View>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <MingcuteTimeLine
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.subtitle}>
                {getTimeFromMilliseconds(eventSelect.date.finish)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.titleOther}>
            {i18n._("Price for participation")}:
          </Text>
          <View style={styles.wrapper}>
            <View style={styles.inner}>
              <View style={styles.iconWrapper}>
                <RadixIconsCash
                  width={24}
                  height={24}
                  fill={colors.californiaOrange}
                />
              </View>
              <Text style={styles.title}>{showPrice}</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateOfEvent}>
          <Text style={styles.subtitle}>{i18n._("About event")}:</Text>
          <View style={styles.description}>
            <Text style={styles.text}>
              {showDescription}
              {!isFullDescription && (
                <TouchableOpacity
                  style={styles.buttonFullDescription}
                  onPress={() => {
                    setIsFullDescription(true);
                  }}
                >
                  <Text style={styles.fullTextTitle}>
                    <Trans>Read the whole description...</Trans>
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
        </View>
        <View style={styles.mapWrapper}>
          {eventSelect.location ? (
            <Map
              longitude={eventSelect.location.geometry.location.lng}
              latitude={eventSelect.location.geometry.location.lat}
            />
          ) : null}
        </View>
        {eventSelect.images.length ? (
          <View style={styles.gallery}>
            <Text style={styles.subtitle}>{i18n._("Gallery")}:</Text>
            <ScrollView horizontal>
              {eventSelect.images.map((image) => (
                <TouchableOpacity
                  key={`image-gallery-${image.id}`}
                  style={styles.imageGallery}
                >
                  <ImageCache
                    style={styles.image}
                    contentFit="cover"
                    imageSrc={image.url}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => null} style={styles.galleryButton}>
              <Text style={styles.galleryButtonTitle}>
                {i18n._("All photos")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};
