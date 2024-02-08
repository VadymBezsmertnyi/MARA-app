import React, { FunctionComponent, useContext, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

// icons
import { IconSearchInput } from "../../../icons/components";

// constants
import { WORKSHOP } from "./DELETE_workers.constants";
import { PATHS_WORKSHOP_SCREENS } from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./WorkshopMain.styles";
import { convertDistance, getDistance } from "geolib";

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList> &
    DrawerNavigationHelpers;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { workshops } = useContext(workshopsContext);
  const { location } = useContext(mapContext);
  const [isShowSort, setIsShowSort] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [workshopName, setWorkshopName] = useState("");
  const [filters, setFilters] = useState<TypeFilters | null>(null);

  const onClose = () => {
    setIsShowSort(false);
    setIsShowFilter(false);
  };

  const setTypeSort = (type: "comments" | "distance" | "rating") => {
    console.log(type);
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
          {workshops.map((item) => {
            const distance = location
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
          })}
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
          />
        </Modal>
      ) : null}
    </>
  );
};
