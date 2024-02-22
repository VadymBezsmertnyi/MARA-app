import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Trans } from "@lingui/macro";
import { convertDistance, getDistance } from "geolib";

// providers
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";
import { localesContext } from "../../../../localization/localization.provider";
import { TypeFilters } from "./components/ModalFilter/ModalFilter.types";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

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

// styles
import { styles } from "./WorkshopMain.styles";

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList> &
    DrawerNavigationHelpers;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { workshops, minMaxDistance } = useContext(workshopsContext);
  const { location } = useContext(mapContext);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [workshopName, setWorkshopName] = useState("");
  const [filters, setFilters] = useState<TypeFilters | null>(null);
  const [sort, setSort] = useState<"comments" | "distance" | "rating" | null>(
    null
  );
  console.log("workshops", workshops);
  console.log("filters", filters);
  console.log("sort", sort);
  const workshopsFilterSort = useMemo(() => {
    if (filters === null && sort === null) return workshops;
    const filterWorkshop = filters
      ? workshops.filter((workshop) => {
          const distance =
            location && workshop.place.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: workshop.place.coordinates.longitude,
                    latitude: workshop.place.coordinates.latitude,
                  }),
                  "km"
                )
              : null;
          const isMoto = filters.moto
            ? workshop.motoTypesWorks.filter(
                (typeWork) => filters.moto?.includes(typeWork)
              ).length > 0
            : true;
          const isAuto = filters.auto
            ? workshop.autoTypesWorks.filter(
                (typeWork) => filters.auto?.includes(typeWork)
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
            location && prev.place.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: prev.place.coordinates.longitude,
                    latitude: prev.place.coordinates.latitude,
                  }),
                  "km"
                )
              : null;
          const distanceNext =
            location && next.place.coordinates
              ? convertDistance(
                  getDistance(location, {
                    longitude: next.place.coordinates.longitude,
                    latitude: next.place.coordinates.latitude,
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
      ? workshops.filter((workshop) =>
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
    setSort(type);
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
          <HeaderFilters
            onPressFilter={() => {
              setIsShowFilter(true);
            }}
            onPressSort={() => {
              setIsShowSort(true);
            }}
          />
        }
        containerStyle={styles.containerHeader}
        rightStyle={styles.containerRightHeader}
      />
      <View style={styles.container}>
        <View style={styles.search}>
          <Input
            value={workshopName}
            placeholder={i18n._(
              "Enter the name of the workshop or type of work"
            )}
            onChange={setWorkshopName}
            InputIcon={<IconSearchInput width={26} height={26} />}
          />
        </View>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {workshops.length ? (
            workshopsFilterSort.map((item) => {
              const distance =
                location && item.place.coordinates
                  ? getDistance(location, {
                      longitude: item.place.coordinates.longitude,
                      latitude: item.place.coordinates.latitude,
                    })
                  : null;
              return (
                <WorkshopItem
                  key={`workshop-${item.id}`}
                  workshopId={item.id}
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
                  image={item.images[0]}
                />
              );
            })
          ) : (
            <View style={styles.containerNotList}>
              <ImageCache
                contentFit="contain"
                style={styles.imageNotElements}
                imageSrc={notWorkshopsImage}
              />
              <Text style={styles.titleNotList}>
                <Trans>Sorry, there are no upcoming workshops</Trans>
              </Text>
            </View>
          )}
          <View style={styles.containerEmpty} />
        </ScrollView>
        <AddEventButton onPress={onPressAddWorkshop} />
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
