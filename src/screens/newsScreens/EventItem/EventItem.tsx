import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { getDistance } from "geolib";
import { Trans } from "@lingui/macro";

// types
import { RootEventsScreensParamList } from "../../../navigators/Navigators.types";

// helps
import { dateToNMY, getTimeFromMilliseconds } from "../../../helps/helps";

// icons
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";
import { userContext } from "../../../providers/UserProvider/UserProvider";

// components
import { Map } from "../../../components/Map/Map";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { GalleryModal } from "../../../components/GalleryModal/GalleryModal";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { Header } from "../../../components/Header/Header";
import { HeaderRightItem } from "../../workshopsScreens/WorkshopsItem/components/HeaderRightItem/HeaderRightItem";

// icons
import {
  RadixIconsCash,
  RadixIconsCalendar,
  MingcuteTimeLine,
} from "../../../icons/components";

// styles
import { styles } from "./EventItem.styles";
import colors from "../../../../styles/colors";

type EventItemProps = {
  route: RouteProp<
    RootEventsScreensParamList,
    keyof RootEventsScreensParamList
  >;
};

export const EventItem: FunctionComponent<EventItemProps> = ({ route }) => {
  const { i18n, language } = useContext(localesContext);
  const { eventsList, changeEvent } = useContext(eventsContext);
  const { location } = useContext(mapContext);
  const { places } = useContext(placesContext);
  const { userData } = useContext(userContext);
  const tabBarHeight = useBottomTabBarHeight();
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [gallery, setGallery] = useState<{
    images: string[];
    indexImage?: number;
  } | null>(null);
  const eventSelect = useMemo(
    () =>
      route.params?.eventId
        ? eventsList.find((event) => event.id === route.params?.eventId) || null
        : null,
    [route.params, eventsList]
  );
  const isLike = useMemo(
    () =>
      userData && eventSelect
        ? eventSelect.likeUserIds.includes(userData.id)
        : false,
    [eventSelect?.likeUserIds]
  );
  const showTitlePlace = useMemo(() => {
    const country = places
      ? Object.keys(places)
          .map((placeKey) => places[placeKey])
          .find((country) => country.id === eventSelect?.place?.countryId) ||
        null
      : null;

    const region =
      country?.regions.find(
        (region) => region.placeId === eventSelect?.place?.regionPlaceId
      )?.name[language] || "";
    if (country && eventSelect?.place)
      return `${eventSelect?.place.address}, ${eventSelect?.place.city}\n${region}, ${country.title}`;
    return ``;
  }, [places, eventSelect?.place]);
  const firstImage = useMemo(
    () => (eventSelect?.images.length ? eventSelect.images[0] : null),
    [eventSelect]
  );
  const distance = useMemo(
    () =>
      location && eventSelect?.place?.coordinates
        ? getDistance(location, {
            longitude: eventSelect.place?.coordinates?.longitude,
            latitude: eventSelect.place?.coordinates.latitude,
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
    if (eventSelect?.images.length) {
      setGallery({
        images: eventSelect.images.map((image) => image.url),
        indexImage,
      });
    }
  };
  const onPressLike = () => {
    if (eventSelect && userData) {
      const currentImages = eventSelect.images.map((image) => ({
        id: image.id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const likeUserIds = isLike
        ? eventSelect.likeUserIds.filter(
            (likeUserId) => likeUserId !== userData?.id
          )
        : [...eventSelect.likeUserIds, userData.id];
      changeEvent({ ...eventSelect, images: currentImages, likeUserIds });
    }
  };

  useEffect(() => {
    if (eventSelect && eventSelect.description.length > 300)
      setIsFullDescription(false);
    else setIsFullDescription(true);
  }, []);

  if (!eventSelect) return null;

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={i18n._("Event")}
        rightElement={
          <HeaderRightItem onPressLike={onPressLike} isLike={isLike} />
        }
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
                      <Trans>Read the whole description...</Trans>
                    </Text>
                  </TouchableOpacity>
                )}
              </Text>
            </View>
          </View>
          <View style={styles.mapWrapper}>
            {eventSelect.place?.coordinates ? (
              <Map
                longitude={eventSelect.place.coordinates.longitude}
                latitude={eventSelect.place.coordinates.latitude}
              />
            ) : null}
          </View>
          {eventSelect.images.length ? (
            <View style={styles.gallery}>
              <Text style={styles.subtitle}>{i18n._("Gallery")}:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eventSelect.images.map((image, indexImage) => (
                  <TouchableOpacity
                    key={`image-gallery-${image.id}`}
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
      <Modal visible={gallery !== null} transparent>
        {gallery ? (
          <ModalWindow
            onClose={() => {
              setGallery(null);
            }}
          >
            <GalleryModal
              data={gallery}
              onClose={() => {
                setGallery(null);
              }}
            />
          </ModalWindow>
        ) : null}
      </Modal>
    </View>
  );
};
