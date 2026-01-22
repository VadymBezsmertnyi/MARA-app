import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getDistance } from "geolib";

// types
import {
  RootEventsScreensParamList,
  RootMainTabsParamList,
} from "../../../navigators/Navigators.types";

// helps
import { dateToNMY, getTimeFromMilliseconds } from "../../../helps/helps";

// icons
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useEventsProvider } from "../../../providers/EventsProvider/EventsProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useSharingProvider } from "../../../providers/SharingProvider/SharingProvider";

// components
import { Map } from "../../../components/Map/Map";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { GalleryModal } from "../../../components/GalleryModal/GalleryModal";
import { Header } from "../../../components/Header/Header";
import { HeaderRightItem } from "../../workshopsScreens/WorkshopsItem/components/HeaderRightItem/HeaderRightItem";

// icons
import {
  RadixIconsCash,
  RadixIconsCalendar,
  MingcuteTimeLine,
} from "../../../icons/components";

// constants
import {
  PATHS_EVENTS_SCREENS,
  PATHS_MAIN_TABS,
} from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./EventItem.styles";
import colors from "../../../../styles/colors";

type EventItemProps = {
  navigation: NativeStackNavigationProp<
    RootEventsScreensParamList & RootMainTabsParamList
  >;
  route: RouteProp<
    RootEventsScreensParamList,
    keyof RootEventsScreensParamList
  >;
};

export const EventItem: FunctionComponent<EventItemProps> = ({
  route,
  navigation,
}) => {
  const { i18n, language } = useLocalesProvider();
  const { eventsList, changeEvent } = useEventsProvider();
  const { location } = useMapProvider();
  const { placesDB } = usePlacesProvider();
  const { userData } = useUserProvider();
  const { getSharedLink } = useSharingProvider();
  const tabBarHeight = useBottomTabBarHeight();
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [gallery, setGallery] = useState<{
    images: string[];
    indexImage?: number;
  } | null>(null);
  const eventSelect = useMemo(
    () =>
      route.params?.eventId
        ? eventsList.find((event) => event._id === route.params?.eventId) ||
          null
        : null,
    [route.params, eventsList]
  );
  const isLike = useMemo(
    () =>
      userData && eventSelect
        ? eventSelect.likeUserIds.map((item) => item._id).includes(userData._id)
        : false,
    [eventSelect?.likeUserIds]
  );
  const showTitlePlace = useMemo(() => {
    if (!eventSelect) return "";
    const placeDB = eventSelect.place_id;
    if (!placeDB) return "";
    return placeDB[language].formatted_address;
  }, [placesDB, eventSelect?.place_id]);
  const firstImage = useMemo(
    () => (eventSelect?.imageFiles.length ? eventSelect.imageFiles[0] : null),
    [eventSelect]
  );
  const distance = useMemo(
    () =>
      location && eventSelect?.coordinates
        ? getDistance(location, {
            longitude: eventSelect?.coordinates?.longitude,
            latitude: eventSelect?.coordinates.latitude,
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
  const iconWrapperLightBlueStyles = useMemo(
    () => [styles.iconWrapper, styles.iconWrapperLightBlue],
    []
  );

  const onShowGallery = (indexImage?: number) => {
    if (eventSelect?.imageFiles.length) {
      setGallery({
        images: eventSelect.imageFiles.map((image) => image.url),
        indexImage,
      });
    }
  };
  const onPressLike = () => {
    if (eventSelect && userData) {
      const currentImageFiles = eventSelect.imageFiles.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
      }));
      const likeUserIds = isLike
        ? eventSelect.likeUserIds
            .filter((likeUserId) => likeUserId._id !== userData?._id)
            .map((item) => item._id)
        : [
            ...eventSelect.likeUserIds.map((likeUserId) => likeUserId._id),
            userData._id,
          ];
      changeEvent({
        ...eventSelect,
        userId: eventSelect.userId?._id || userData._id,
        imageFiles: currentImageFiles,
        likeUserIds,
      });
    }
  };

  useEffect(() => {
    if (eventSelect && eventSelect.description.length > 300)
      setIsFullDescription(false);
    else setIsFullDescription(true);
  }, []);

  const onPressShare = () => {
    if (eventSelect) getSharedLink({ eventId: eventSelect._id });
  };

  if (!eventSelect) return null;

  return (
    <View style={styles.containerMain}>
      <Header
        title={i18n._("Event")}
        rightElement={
          <HeaderRightItem
            onPressLike={onPressLike}
            isLike={isLike}
            onPressShare={onPressShare}
          />
        }
        onPressLeftElement={() => {
          if (!route.params?.isMap)
            navigation.navigate(PATHS_EVENTS_SCREENS.eventsMain);
          navigation.navigate(PATHS_MAIN_TABS.map);
        }}
      />
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
              <TouchableOpacity
                style={styles.buttonAllImage}
                onPress={() => {
                  onShowGallery();
                }}
              >
                <Text style={styles.titleAllImage}>{i18n._("All photos")}</Text>
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
              {showTitlePlace}
            </Text>
            <DistanceCard distance={distance} />
          </View>
          <View style={styles.dateOfEvent}>
            <Text style={styles.titleOther}>{i18n._("Date of the event")}</Text>
            <Text style={styles.label}>{i18n._("The beginning")}:</Text>
            <View style={styles.wrapper}>
              <View style={styles.inner}>
                <View style={iconWrapperLightBlueStyles}>
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
                <View style={iconWrapperLightBlueStyles}>
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
                <View style={iconWrapperLightBlueStyles}>
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
                      {i18n._("Read the whole description...")}
                    </Text>
                  </TouchableOpacity>
                )}
              </Text>
            </View>
          </View>
          {eventSelect.coordinates ? (
            <View style={styles.mapWrapper}>
              <Map
                longitude={eventSelect.coordinates.longitude}
                latitude={eventSelect.coordinates.latitude}
              />
            </View>
          ) : null}
          {eventSelect.imageFiles.length ? (
            <View style={styles.gallery}>
              <Text style={styles.subtitle}>{i18n._("Gallery")}:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eventSelect.imageFiles.map((image, indexImage) => (
                  <TouchableOpacity
                    key={`image-gallery-${image._id}`}
                    style={styles.imageGallery}
                    onPress={() => {
                      onShowGallery(indexImage);
                    }}
                  >
                    <ImageCache
                      style={styles.image}
                      contentFit="cover"
                      imageSrc={image.url}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  onShowGallery();
                }}
                style={styles.galleryButton}
              >
                <Text style={styles.galleryButtonTitle}>
                  {i18n._("All photos")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
      {gallery && (
        <GalleryModal
          data={gallery}
          onClose={() => {
            setGallery(null);
          }}
        />
      )}
    </View>
  );
};
