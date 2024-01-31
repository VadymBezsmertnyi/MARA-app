import React, { FunctionComponent, useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootWorkshopsScreensParamList } from "../../../navigators/Navigators.types";
import { localesContext } from "../../../../localization/localization.provider";

// components
import { Input } from "../../../components/Input/Input";
import { WorkshopItem } from "./components/WorkshopItem/WorkshopItem";
import { Header } from "../../../components/Header/Header";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { HeaderFilters } from "./components/HeaderFilters/HeaderFilters";
import { AddEventButton } from "../../../components/AddEventButton/AddEventButton";

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
  const [workshopName, setWorkshopName] = useState("");

  return (
    <>
      <Header
        leftElement={<MenuBurgerButton />}
        title={i18n._("Workshops")}
        rightElement={
          <HeaderFilters onPressFilter={() => null} onPressSort={() => null} />
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
    </>
  );
};
