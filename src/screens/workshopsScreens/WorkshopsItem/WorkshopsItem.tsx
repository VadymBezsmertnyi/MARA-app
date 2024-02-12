import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Trans } from "@lingui/macro";
import { getDistance } from "geolib";
import * as Linking from "expo-linking";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { placesContext } from "../../../providers/PlacesProvider/PlacesProvider";

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

// icons
import {
  IconAutoService,
  IconMotoService,
  RadixIconsCalendar,
} from "../../../icons/components";

// styles
import { styles } from "./WorkshopsItem.styles";

type WorkshopsItemType = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
  route: RouteProp<
    RootWorkshopsScreensParamList,
    keyof RootWorkshopsScreensParamList
  >;
};

export const WorkshopsItem: FunctionComponent<WorkshopsItemType> = ({
  navigation,
  route,
}) => {
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const { workshops } = useContext(workshopsContext);
  const { places } = useContext(placesContext);
  const { location } = useContext(mapContext);
  const [amountShow, setAmountShow] = useState(5);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isShowModalComment, setIsShowModalComment] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const selectWorkshop = useMemo(
    () =>
      workshops.find((workshop) => workshop.id === route.params?.workshopId) ||
      null,
    [workshops, route.params]
  );
  const distance =
    location && selectWorkshop
      ? getDistance(location, {
          longitude: selectWorkshop.place.coordinates.longitude,
          latitude: selectWorkshop.place.coordinates.latitude,
        })
      : null;

  const isCommentUser = useMemo(
    () =>
      selectWorkshop && userData
        ? selectWorkshop.comments.filter(
            (comment) => comment.userId === userData.id
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
    const country = places
      ? Object.keys(places)
          .map((placeKey) => places[placeKey])
          .find((country) => country.id === selectWorkshop?.place.countryId) ||
        null
      : null;
    if (country && selectWorkshop?.place)
      return `${country.title}, ${selectWorkshop?.place.city}, ${selectWorkshop?.place.address}`;
    return ``;
  }, [places, selectWorkshop?.place]);

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

  const test = async () => {
    const initialUrl = await Linking.parseInitialURLAsync();
    console.log("URL-адреса:", initialUrl);
    console.log("route:", route);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={i18n._("Workshop")} rightElement={<HeaderRightItem />} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.containerMain}>
          <View style={styles.containerInfo}>
            <View style={styles.containerSlider}>
              <CustomSlider
                images={selectWorkshop?.images || []}
                loop
                styleScroll={(props) => [props, styles.imagesScroll]}
              />
            </View>
            <View style={styles.info}>
              <View style={styles.titles}>
                <Text style={styles.titleInfo}>{selectWorkshop?.title}</Text>
                <Text style={styles.subTitleInfo}>{showTitlePlace}</Text>
              </View>
              <DistanceCard distance={distance} numberOfLines={1} />
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
                    style={styles.autoIcon}
                  />
                ) : null}
                {selectWorkshop?.motoTypesWorks.length ? (
                  <IconMotoService width={40} height={40} />
                ) : null}
              </View>
            </View>
          </View>
          {selectWorkshop ? (
            <View style={styles.containerMap}>
              <Map
                longitude={selectWorkshop.place.coordinates.longitude}
                latitude={selectWorkshop.place.coordinates.latitude}
              />
            </View>
          ) : null}
          <View style={styles.containerDescription}>
            <Text style={styles.titleDescription}>
              <Trans>About us:</Trans>
            </Text>
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
                    <Trans>Read the whole description...</Trans>
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
