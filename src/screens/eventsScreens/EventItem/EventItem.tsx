import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getDistance } from "geolib";
import { MaterialIcons } from "@expo/vector-icons";

// types
import {
  RootEventsScreensParamList,
  RootMainTabsParamList,
} from "../../../navigators/Navigators.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";
import { useEventsSelector } from "../../../storeRedux/apis/events/slice";
import {
  useChangeEventMutation,
  useSendSmsVerificationMutation,
  useVerifySmsCodeMutation,
  useLazyGetEventByIdQuery,
} from "../../../storeRedux/api";
import { TEvent } from "../../../storeRedux/apis/events/events.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useSharingProvider } from "../../../providers/SharingProvider/SharingProvider";
import { useDropDownAlertProvider } from "../../../providers/DropDownAlertProvider/DropDownAlertProvider";

// helps
import { dateToNMY, getTimeFromMilliseconds } from "../../../helps/helps";

// components
import { Map as MapComponent } from "../../../components/Map/Map";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { GalleryModal } from "../../../components/GalleryModal/GalleryModal";
import { Header } from "../../../components/Header/Header";
import { HeaderRightActions } from "../../../components/HeaderRightActions/HeaderRightActions";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ModalEnterCode } from "../../settingsScreens/SettingsWorkshops/components/ModalEnterCode/ModalEnterCode";
import { ModalReportContact } from "../../../components/ModalReportContact/ModalReportContact";
import { FooterComments } from "./components/FooterComments/FooterComments";
import { ModalComment } from "./components/ModalComment/ModalComment";
import { TimelineSection } from "./components/TimelineSection/TimelineSection";

// icons
import {
  RadixIconsCash,
  RadixIconsCalendar,
  MingcuteTimeLine,
} from "../../../icons/components";

// styles
import { styles } from "./EventItem.styles";
import colors from "../../../../styles/colors";
import { resetNavigationToMap } from "../../../navigators/Navigators.helps";

const EXPO_PUBLIC_WEB_SITE_URL =
  process.env.EXPO_PUBLIC_WEB_SITE_URL || "https://m-a-r-a.netlify.app";

type EventDetailsScreenProps = {
  navigation: NativeStackNavigationProp<
    RootEventsScreensParamList & RootMainTabsParamList
  >;
  route: RouteProp<
    RootEventsScreensParamList,
    keyof RootEventsScreensParamList
  >;
};

export const EventDetailsScreen: FunctionComponent<EventDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { i18n, language } = useLocalesProvider();
  const {
    eventsUserList,
    upcomingEventsList,
    pastEventsList,
    upcomingClosest,
    pastClosest,
  } = useEventsSelector();
  const { location } = useMapProvider();
  const { placesDB } = usePlacesProvider();
  const { userData } = useUserSelector();
  const { createSharedLink } = useSharingProvider();
  const { showMessageServer } = useDropDownAlertProvider();
  const [changeEventMutation] = useChangeEventMutation();
  const [sendSms] = useSendSmsVerificationMutation();
  const [verifyCode, { isLoading: verifyingCode }] = useVerifySmsCodeMutation();
  const [fetchEventById, { data: eventByIdData }] = useLazyGetEventByIdQuery();
  const tabBarHeight = useBottomTabBarHeight();
  const [amountShow, setAmountShow] = useState(5);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<{
    images: string[];
    indexImage?: number;
  } | null>(null);
  const eventId =
    typeof route.params?.eventId === "string"
      ? route.params.eventId
      : undefined;
  const combinedEvents = useMemo<TEvent[]>(() => {
    const eventsMap = new Map<string, TEvent>();
    [
      ...eventsUserList,
      ...upcomingEventsList,
      ...pastEventsList,
      ...upcomingClosest,
      ...pastClosest,
    ].forEach((event) => {
      eventsMap.set(event._id, event);
    });
    return Array.from(eventsMap.values());
  }, [
    eventsUserList,
    upcomingEventsList,
    pastEventsList,
    upcomingClosest,
    pastClosest,
  ]);
  const eventFromList = useMemo(
    () =>
      eventId ? combinedEvents.find((event) => event._id === eventId) : null,
    [eventId, combinedEvents]
  );
  const eventFromApi = useMemo(
    () =>
      eventByIdData?.event && eventByIdData.event._id === eventId
        ? eventByIdData.event
        : null,
    [eventByIdData?.event, eventId]
  );
  const eventSelect = useMemo(
    () => eventFromList || eventFromApi,
    [eventFromList, eventFromApi]
  );
  const isLike = useMemo(
    () =>
      userData && eventSelect
        ? eventSelect.likeUserIds.includes(userData._id)
        : false,
    [eventSelect?.likeUserIds]
  );
  const isCommentUser = useMemo(
    () =>
      eventSelect && userData
        ? eventSelect.comments.filter(
            (comment) => comment.userId === userData._id
          ).length > 0
        : false,
    [eventSelect, userData]
  );
  const commentsForDisplay = useMemo(() => {
    const currentUserId = userData?._id;
    const pendingLabel = "На перевірці";
    if (!eventSelect?.comments) return [];
    return eventSelect.comments
      .filter((comment) => {
        if (comment.status === "pending") return comment.userId === currentUserId;
        return comment.status === "verify" || comment.status === undefined;
      })
      .map((comment) =>
        comment.status === "pending" && comment.userId === currentUserId
          ? { ...comment, userName: `${comment.userName} (${pendingLabel})` }
          : comment
      );
  }, [eventSelect?.comments, userData?._id]);
  const commentsReverse = useMemo(
    () => [...commentsForDisplay].reverse(),
    [commentsForDisplay]
  );
  const hasOwner = !!eventSelect?.ownerUserId;
  const isCurrentUserOwner =
    userData &&
    eventSelect?.ownerUserId &&
    (typeof eventSelect.ownerUserId === "string"
      ? eventSelect.ownerUserId === userData._id
      : eventSelect.ownerUserId._id === userData._id);
  const isCurrentUserCreator =
    userData &&
    eventSelect?.userId &&
    (typeof eventSelect.userId === "string"
      ? eventSelect.userId === userData._id
      : eventSelect.userId._id === userData._id);
  const showConfirmButton = !hasOwner && userData;
  const showReportButton =
    !isCurrentUserOwner && !isCurrentUserCreator && userData;
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
  const goingCount = eventSelect?.goingUserIds?.length || 0;
  const isGoing = useMemo(
    () =>
      !!(
        userData &&
        eventSelect?.goingUserIds?.some((userId) => userId === userData._id)
      ),
    [eventSelect?.goingUserIds, userData]
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
  }, [eventSelect?.price, language]);
  const containerStyles = useMemo(
    () => ({ ...styles.container, paddingBottom: tabBarHeight || 0 }),
    [tabBarHeight]
  );
  const iconWrapperLightBlueStyles = useMemo(
    () => [styles.iconWrapper, styles.iconWrapperLightBlue],
    []
  );

  const onClose = () => {
    setIsShowModalComment(false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (
      amountShow < commentsReverse.length &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height
    )
      setAmountShow((state) =>
        state + 5 <= commentsReverse.length ? state + 5 : commentsReverse.length
      );
  };

  const onShowGallery = (indexImage?: number) => {
    if (eventSelect?.imageFiles.length)
      setGallery({
        images: eventSelect.imageFiles.map((image) => image.url),
        indexImage,
      });
  };
  const onPressLike = async () => {
    if (eventSelect && userData) {
      const currentImageFiles = eventSelect.imageFiles.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
      }));
      const likeUserIds = isLike
        ? eventSelect.likeUserIds.filter(
            (likeUserId) => likeUserId !== userData?._id
          )
        : [...eventSelect.likeUserIds, userData._id];
      try {
        await changeEventMutation({
          body: {
            _id: eventSelect._id,
            userId: eventSelect.userId?._id || userData._id,
            imageFiles: currentImageFiles,
            likeUserIds,
            goingUserIds: eventSelect.goingUserIds,
            comments: eventSelect.comments || [],
            timeline: eventSelect.timeline || [],
          },
        }).unwrap();
      } catch (error) {
        console.warn("error onPressLike:", error);
      }
    }
  };

  const handleConfirmOwnership = async () => {
    if (!eventSelect || !userData) return;
    if (!userData.phoneNumber) {
      await showMessageServer(
        i18n._("Error"),
        i18n._("Phone number not found"),
        "error"
      );
      return;
    }
    setCodeError(null);
    const result = await sendSms({
      body: {
        eventId: eventSelect._id,
        phoneNumber: userData.phoneNumber,
      },
    });
    if (result.data?.status === "success") setShowCodeModal(true);
    else
      await showMessageServer(
        i18n._("Error"),
        result.data?.reason || i18n._("Failed to send SMS"),
        "error"
      );
  };

  const handleCodeConfirm = async (code: string) => {
    if (!eventSelect) return;
    setCodeError(null);
    const result = await verifyCode({
      body: {
        eventId: eventSelect._id,
        code,
      },
    });
    if (result.data?.status === "success") {
      setShowCodeModal(false);
      await fetchEventById({ eventId: eventSelect._id });
      await showMessageServer(
        i18n._("Success"),
        i18n._("Everything is successful and this is your business"),
        "success"
      );
    } else
      setCodeError(result.data?.reason || i18n._("Invalid or expired code"));
  };

  useEffect(() => {
    if (eventSelect && eventSelect.description.length > 300)
      setIsFullDescription(false);
    else setIsFullDescription(true);
  }, [eventSelect?.description]);

  useEffect(() => {
    if (!eventId) return;
    if (eventFromList) return;
    if (eventFromApi) return;
    fetchEventById({ eventId });
  }, [eventId, eventFromList, eventFromApi]);

  const onPressShare = async () => {
    if (!eventSelect) return;

    const appLink = await createSharedLink({ eventId: eventSelect._id });
    if (!appLink) {
      await showMessageServer(
        i18n._("Error"),
        i18n._("Failed to create share link"),
        "error"
      );
      return;
    }

    const shortLink = eventSelect._id;
    const webLink = `${EXPO_PUBLIC_WEB_SITE_URL}/share/${shortLink}`;
    const message = i18n._(
      "Open the event in the app:\n{appLink}\n\nOpen in the browser:\n{webLink}",
      { appLink, webLink }
    );
    await Share.share({
      title: i18n._("Share event"),
      message,
    });
  };

  const onPressGoing = async () => {
    if (!eventSelect || !userData) {
      await showMessageServer(
        i18n._("Error"),
        i18n._("Please sign in to continue"),
        "error"
      );
      return;
    }
    try {
      const currentImageFiles = eventSelect.imageFiles.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
      }));
      const goingUserIds = isGoing
        ? eventSelect.goingUserIds.filter((id) => id !== userData._id)
        : [...eventSelect.goingUserIds, userData._id];
      await changeEventMutation({
        body: {
          _id: eventSelect._id,
          userId: eventSelect.userId?._id || userData._id,
          goingUserIds,
          imageFiles: currentImageFiles,
        },
      }).unwrap();
    } catch (error) {
      console.warn("error onPressGoing:", error);
    }
  };

  if (!eventSelect) return null;

  return (
    <View style={styles.containerMain}>
      <Header
        title={i18n._("Event")}
        rightElement={
          <HeaderRightActions
            onPressLike={onPressLike}
            isLike={isLike}
            onPressShare={onPressShare}
          />
        }
        onPressLeftElement={() => {
          if (!route.params?.isMap) navigation.goBack();
          else resetNavigationToMap(navigation);
        }}
        containerStyle={{ paddingRight: 0 }}
      />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
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
          <View style={styles.goingButtonContainer}>
            <TouchableOpacity style={styles.goingButton} onPress={onPressGoing}>
              <MaterialIcons
                name="groups"
                size={18}
                color={colors.californiaOrange}
              />
              <Text style={styles.goingText}>{goingCount}</Text>
              <Text style={styles.goingLabel}>
                {isGoing ? i18n._("Не йду") : i18n._("Йду")}
              </Text>
            </TouchableOpacity>
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
          <TimelineSection timeline={eventSelect.timeline} />
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
          {showConfirmButton && eventSelect && (
            <View style={styles.containerConfirmOwnership}>
              <Text style={styles.confirmOwnershipText}>
                {i18n._("This business has not been confirmed by the owner")}
              </Text>
              <TouchableOpacity
                style={styles.buttonConfirmOwnership}
                onPress={handleConfirmOwnership}
              >
                <Text style={styles.buttonConfirmOwnershipText}>
                  {i18n._("Confirm business")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showReportButton && (
            <View style={styles.containerReport}>
              <TouchableOpacity
                style={styles.buttonReport}
                onPress={() => setShowReportModal(true)}
              >
                <Text style={styles.buttonReportText}>
                  {i18n._("Report on business")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {eventSelect.coordinates ? (
            <View style={styles.mapWrapper}>
              <MapComponent
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
          <FooterComments
            data={commentsReverse.slice(0, amountShow)}
            isCommentUser={isCommentUser}
            setIsShowModalComment={setIsShowModalComment}
            rating={eventSelect.rating || 0}
          />
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
      {isShowModalComment && (
        <ModalComment selectEvent={eventSelect} onClose={onClose} />
      )}
      {gallery && (
        <GalleryModal
          data={gallery}
          onClose={() => {
            setGallery(null);
          }}
        />
      )}
      <ModalEnterCode
        visible={showCodeModal}
        onClose={() => {
          setShowCodeModal(false);
          setCodeError(null);
        }}
        onConfirm={handleCodeConfirm}
        isLoading={verifyingCode}
        error={codeError}
      />
      <ModalReportContact
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </View>
  );
};
