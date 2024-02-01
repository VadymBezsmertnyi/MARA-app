import React, { FunctionComponent, useContext, useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";
import { localesContext } from "../../../../localization/localization.provider";
import { TypeFilters } from "./components/ModalFilter/ModalFilter.types";

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

// styles
import { styles } from "./WorkshopMain.styles";

type WorkshopMainProps = {
  navigation: NativeStackNavigationProp<RootWorkshopsScreensParamList>;
};

export const WorkshopMain: FunctionComponent<WorkshopMainProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
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

  return (
    <>
      <Header
        leftElement={<MenuBurgerButton />}
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
          {WORKSHOP.map((item) => (
            <WorkshopItem
              key={item.id}
              workshopId={item.id}
              title={item.title}
              description={item.description}
              range={item.range}
              comments={item.comments}
              rate={item.range}
              navigation={navigation}
              isAutoService={item.isAutoService}
              isMotoService={item.isMotoService}
              image={item.photo}
            />
          ))}
          <View style={styles.containerEmpty} />
        </ScrollView>
        <AddEventButton onPress={() => null} />
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
