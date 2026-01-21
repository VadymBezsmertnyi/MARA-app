import React, { FunctionComponent, useMemo, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { convertDistance, getDistance } from "geolib";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// providers
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { TypeFilters } from "./components/ModalFilter/ModalFilter.types";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { Input } from "../../../components/Input/Input";
import { WorkshopItem } from "./components/WorkshopItem/WorkshopItem";
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { HeaderFilters } from "./components/HeaderFilters/HeaderFilters";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { ModalSort } from "./components/ModalSort/ModalSort";
import { ModalFilter } from "./components/ModalFilter/ModalFilter";
import { ImageCache } from "../../../components/ImageCache/ImageCache";

// icons
import { IconSearchInput } from "../../../icons/components";

// constants
import { PATHS_WORKSHOP_SCREENS } from "../../../navigators/useNavigator.constants";

// images
import notWorkshopsImage from "../../../../assets/workshops/notWorkshops.jpeg";
import notWorkshopsFilterImage from "../../../../assets/workshops/notWorkshopsFilter.jpeg";

// styles
import { styles } from "./WorkshopMain.styles";

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList> &
    DrawerNavigationProp<RootWorkshopsScreensParamList>;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();
  const { heightTabBar } = useThemeProvider();
  const { workshops, minMaxDistance } = useWorkshopsProvider();
  const { location } = useMapProvider();
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [workshopName, setWorkshopName] = useState("");
  const [filters, setFilters] = useState<TypeFilters | null>(null);
  const [sort, setSort] = useState<"comments" | "distance" | "rating" | null>(
    null
  );
  const workshopsFilterSort = useMemo(() => {
    if (filters === null && sort === null && !workshopName.length)
      return workshops;
    const filterWorkshop = filters
      ? workshops.filter((workshop) => {
          const distance =
            location && workshop.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: workshop.coordinates.longitude,
                    latitude: workshop.coordinates.latitude,
                  }),
                  "km"
                )
              : null;
          const isMoto = filters.moto
            ? workshop.motoTypesWorks.filter((typeWork) =>
                filters.moto?.includes(typeWork)
              ).length > 0
            : true;
          const isAuto = filters.auto
            ? workshop.autoTypesWorks.filter((typeWork) =>
                filters.auto?.includes(typeWork)
              ).length > 0
            : true;
          const isDistance =
            filters.maxDistance && distance
              ? distance <= filters.maxDistance
              : true;
          const isRating =
            filters.minRating && workshop.rating
              ? filters.minRating <= workshop.rating
              : true;
          return isMoto && isAuto && isDistance && isRating;
        })
      : workshops;
    const sortWorkshop = sort
      ? filterWorkshop.sort((prev, next) => {
          const distancePrev =
            location && prev.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: prev.coordinates.longitude,
                    latitude: prev.coordinates.latitude,
                  }),
                  "km"
                )
              : null;
          const distanceNext =
            location && next.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: next.coordinates.longitude,
                    latitude: next.coordinates.latitude,
                  }),
                  "km"
                )
              : null;
          if (sort === "comments")
            return prev.comments.length - next.comments.length;
          if (sort === "distance" && distancePrev && distanceNext)
            return distancePrev - distanceNext;
          if (sort === "rating" && prev.rating && next.rating)
            return prev.rating - next.rating;
          return 0;
        })
      : filterWorkshop;
    const findInputWorkshop = workshopName.length
      ? sortWorkshop.filter((workshop) =>
          workshop.title
            .toLocaleLowerCase()
            .includes(workshopName.toLocaleLowerCase())
        )
      : sortWorkshop;

    return findInputWorkshop;
  }, [workshops, filters, sort, workshopName]);

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "comments" | "distance" | "rating") => {
    setSort((state) => (state === type ? null : type));
    onClose();
  };

  const onSubmitFilters = (newFilters: TypeFilters) => {
    setFilters(newFilters);
    onClose();
  };

  const onPressAddWorkshop = () => {
    navigation.navigate(PATHS_WORKSHOP_SCREENS.workshopAdd);
  };

  const onPressShowMenu = () => {
    navigation.openDrawer();
  };

  return (
    <>
      <Header
        leftElement={<MenuBurgerButton onPress={onPressShowMenu} />}
        title={i18n._("Workshops")}
        rightElement={
          workshops.length ? (
            <HeaderFilters
              onPressFilter={() => {
                setIsShowFilter(true);
              }}
              onPressSort={() => {
                setIsShowSort(true);
              }}
            />
          ) : (
            <></>
          )
        }
        containerStyle={styles.containerHeader}
        rightStyle={styles.containerRightHeader}
      />
      <View style={styles.container}>
        {workshops.length ? (
          <View style={styles.search}>
            <Input
              value={workshopName}
              placeholder={i18n._(
                "Enter the name of the workshop or type of work"
              )}
              onChange={setWorkshopName}
              InputIcon={
                <IconSearchInput
                  width={26}
                  height={26}
                  style={styles.iconInput}
                />
              }
            />
          </View>
        ) : null}
        <ScrollView
          contentContainerStyle={[
            styles.wrapper,
            {
              paddingBottom: (heightTabBar || 0) + bottom,
            },
          ]}
        >
          {workshops.length && workshopsFilterSort.length ? (
            workshopsFilterSort.map((item) => {
              const distance =
                location && item.coordinates
                  ? getDistance(location, {
                      longitude: item.coordinates.longitude,
                      latitude: item.coordinates.latitude,
                    })
                  : null;
              return (
                <WorkshopItem
                  key={`workshop-${item._id}`}
                  workshopId={item._id}
                  title={item.title}
                  description={item.description}
                  range={
                    distance ? convertDistance(distance, "km").toFixed(2) : null
                  }
                  comments={item.comments.length} //TODO
                  rate={item.rating}
                  navigation={navigation}
                  isAutoService={item.autoTypesWorks.length > 0}
                  isMotoService={item.motoTypesWorks.length > 0}
                  image={item.images ? item.images[0] : null}
                />
              );
            })
          ) : workshops.length ? (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notWorkshopsFilterImage}
              />
              <Text style={styles.titleNotList}>
                {i18n._("Sorry, but no workshops were found by the filters")}
              </Text>
            </View>
          ) : (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notWorkshopsImage}
              />
              <Text style={styles.titleNotList}>
                {i18n._("Sorry, there are no upcoming workshops")}
              </Text>
            </View>
          )}
          <View style={styles.containerEmpty} />
        </ScrollView>
        <AddEventButton
          disabled={infoWorkshops.amountWorkshop <= 0}
          onPress={onPressAddWorkshop}
          accessibilityLabel={i18n._("Add workshop")}
        />
      </View>
      {isShowSort ? (
        <ModalWindow onClose={onClose}>
          <ModalSort onClose={onClose} setTypeSort={setTypeSort} />
        </ModalWindow>
      ) : null}
      {isShowFilter ? (
        <Modal>
          <ModalFilter
            onClose={onClose}
            filters={filters}
            onSubmit={onSubmitFilters}
            maxDistance={minMaxDistance.max}
          />
        </Modal>
      ) : null}
    </>
  );
};
