import React, { FunctionComponent, useMemo } from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { MenuSettings } from "../../screens/mainScreens/MenuSettings/MenuSettings";
import { Dimensions } from "react-native";
import { MainTabs } from "../MainTabs/MainTabs";

const Drawer = createDrawerNavigator();
export const MenuDrawer: FunctionComponent = () => {
  const screenOptions: DrawerNavigationOptions = useMemo(
    () => ({
      drawerType: Dimensions.get("window").width >= 900 ? "slide" : "front",
      headerShown: false,
      drawerStyle: {
        width: "100%",
      },
    }),
    []
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuSettings {...props} />}
      screenOptions={screenOptions}
    >
      <Drawer.Screen component={MainTabs} name="MainTabs" />
    </Drawer.Navigator>
  );
};
