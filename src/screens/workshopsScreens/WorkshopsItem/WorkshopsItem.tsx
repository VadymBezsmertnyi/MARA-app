import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { getDistance } from "geolib";

// types
import {
  RootMainTabsParamList,
  RootWorkshopsScreensParamList,
} from "../../../navigators/Navigators.types";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { usePlacesProvider } from "../../../providers/PlacesProvider/PlacesProvider";
import { useSharingProvider } from "../../../providers/SharingProvider/SharingProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// helps
import { getFormatPhoneNumber } from "../../../helps/helps";

// components
import { Header } from "../../../components/Header/Header";
import { HeaderRightItem } from "./components/HeaderRightItem/HeaderRightItem";
import { CustomSlider } from "../../../components/CustomSlider/CustomSlider";
import { DistanceCard } from "../../../components/DistanceCard/DistanceCard";
import { Map } from "../../../components/Map/Map";
import { ListWorksDo } from "./components/ListWorksDo/ListWorksDo";
import { FooterComments } from "./components/FooterComments/FooterComments";
import { ModalsSheet } from "../../../components/ModalsSheet/ModalsSheet";
import { ModalComment } from "./components/ModalComment/ModalComment";
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// icons
import {
  IconAutoService,
  IconMotoService,
  RadixIconsCalendar,
} from "../../../icons/components";

// image
import WorkshopPlaceholder from "../../../../assets/default/workshop-placeholder.png";

// constants
import { PATHS_MAIN_TABS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./WorkshopsItem.styles";

type WorkshopsItemType = {
  navigation: NativeStackNavigationProp<
    RootWorkshopsScreensParamList & RootMainTabsParamList
  >;
  route: RouteProp<
    RootWorkshopsScreensParamList,
    keyof RootWorkshopsScreensParamList
  >;
};

export const WorkshopsItem: FunctionComponent<WorkshopsItemType> = ({
  navigation,
  route,
}) => {
  const { heightTabBar } = useThemeProvider();
  const { i18n, language } = useLocalesProvider();
  const { userData } = useUserProvider();
  const { workshops, changeWorkshop } = useWorkshopsProvider();
  const { placesDB } = usePlacesProvider();
  const { location } = useMapProvider();
  const { getSharedLink } = useSharingProvider();
  const [amountShow, setAmountShow] = useState(5);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const selectWorkshop = useMemo(
    () =>
      workshops.find((workshop) => workshop._id === route.params?.workshopId) ||
      null,
    [workshops, route.params]
  );
  const distance =
    location && selectWorkshop?.coordinates
      ? getDistance(location, {
          longitude: selectWorkshop.coordinates.longitude,
          latitude: selectWorkshop.coordinates.latitude,
        })
      : null;
  const isLike = useMemo(
    () =>
      userData && selectWorkshop
        ? selectWorkshop.likeUserIds
            .map((likeUserId) => likeUserId._id)
            .includes(userData._id)
        : false,
    [selectWorkshop?.likeUserIds]
  );

  const isCommentUser = useMemo(
    () =>
      selectWorkshop && userData
        ? selectWorkshop.comments.filter(
            (comment) => comment.userId === userData._id
          ).length > 0
        : false,
    [selectWorkshop, userData]
  );
  const commentsReverse = useMemo(
    () =>
      selectWorkshop?.comments ? [...selectWorkshop.comments].reverse() : [],
    [selectWorkshop?.comments]
  );
  const showPhone = useMemo(
    () =>
      selectWorkshop?.phoneNumber
        ? getFormatPhoneNumber(selectWorkshop.phoneNumber)
        : null,
    [selectWorkshop?.phoneNumber]
  );
  const showTitlePlace = useMemo(() => {
    if (!selectWorkshop) return "";

    const placeDB = selectWorkshop.place_id;
    if (!placeDB) return "";

    return placeDB[language].formatted_address;
  }, [placesDB, selectWorkshop?.place_id]);

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

  const onPressLike = () => {
    if (selectWorkshop && userData) {
      const currentImages = selectWorkshop.images.map((image) => ({
        _id: image._id || "",
        url: image.url || "",
        width: image.width,
        height: image.height,
        image,
      }));
      const likeUserIds = isLike
        ? selectWorkshop.likeUserIds
            .filter((likeUserId) => likeUserId._id !== userData?._id)
            .map((item) => item._id)
        : [...selectWorkshop.likeUserIds.map((item) => item._id), userData._id];
      changeWorkshop({
        ...selectWorkshop,
        images: currentImages,
        likeUserIds,
        userId: selectWorkshop.userId?._id || userData._id,
      });
    }
  };

  const onPressShare = () => {
    if (selectWorkshop) getSharedLink({ productId: selectWorkshop._id });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: heightTabBar,
        },
      ]}
    >
      <Header
        title={i18n._("Workshop")}
        rightElement={
          <HeaderRightItem
            onPressLike={onPressLike}
            isLike={isLike}
            onPressShare={onPressShare}
          />
        }
        onPressLeftElement={() => {
          if (!route.params?.isMap) navigation.goBack();
          navigation.navigate(PATHS_MAIN_TABS.map);
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.containerMain}>
          <View style={styles.containerInfo}>
            <View style={styles.containerSlider}>
              {selectWorkshop?.images.length ? (
                <CustomSlider
                  images={selectWorkshop.images}
                  loop
                  styleScroll={(props) => [props, styles.imagesScroll]}
                />
              ) : (
                <ImageCache
                  imageSrc={WorkshopPlaceholder}
                  contentFit="contain"
                  style={StyleSheet.absoluteFillObject}
                />
              )}
            </View>
            <View style={styles.info}>
              <View style={styles.titles}>
                <Text style={styles.titleInfo}>{selectWorkshop?.title}</Text>
                <Text style={styles.subTitleInfo}>{showTitlePlace}</Text>
              </View>
              <DistanceCard
                distance={distance}
                numberOfLines={1}
                containerStyle={styles.containerDistance}
              />
            </View>
            <View style={styles.containerContacts}>
              <View style={styles.containerPhone}>
                <View style={styles.containerIcon}>
                  <RadixIconsCalendar width={24} height={24} />
                </View>
                <Text style={styles.titlePhone}>{showPhone}</Text>
              </View>
              <View style={styles.containerIconsService}>
                {selectWorkshop?.autoTypesWorks.length ? (
                  <IconAutoService
                    width={40}
                    height={40}
                    style={
                      selectWorkshop?.motoTypesWorks.length
                        ? styles.autoIcon
                        : undefined
                    }
                  />
                ) : null}
                {selectWorkshop?.motoTypesWorks.length ? (
                  <IconMotoService width={40} height={40} />
                ) : null}
              </View>
            </View>
          </View>
          {selectWorkshop?.coordinates ? (
            <View style={styles.containerMap}>
              <Map
                longitude={selectWorkshop.coordinates.longitude}
                latitude={selectWorkshop.coordinates.latitude}
              />
            </View>
          ) : null}
          <View style={styles.containerDescription}>
            <Text style={styles.titleDescription}>{i18n._("About us:")}</Text>
            <Text style={styles.description}>
              {isFullDescription
                ? selectWorkshop?.description
                : `${selectWorkshop?.description.slice(0, 100)}... `}
              {!isFullDescription && (
                <TouchableOpacity
                  style={styles.buttonDescription}
                  onPress={() => {
                    setIsFullDescription(true);
                  }}
                >
                  <Text style={styles.titleButtonDescription}>
                    {i18n._("Read the whole description...")}
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          {selectWorkshop ? (
            <ListWorksDo
              motoWorkIds={selectWorkshop.motoTypesWorks}
              autoWorkIds={selectWorkshop.autoTypesWorks}
            />
          ) : null}
          <FooterComments
            data={commentsReverse.slice(0, amountShow)}
            isCommentUser={isCommentUser}
            setIsShowModalComment={setIsShowModalComment}
            rating={selectWorkshop?.rating || 0}
          />
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
      <ModalsSheet isShow={isShowModalComment} onClose={onClose}>
        <ModalComment selectWorkshop={selectWorkshop} onClose={onClose} />
      </ModalsSheet>
    </View>
  );
};
