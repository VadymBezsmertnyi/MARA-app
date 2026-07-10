import React, { FunctionComponent, useMemo } from "react";
import { Dimensions } from "react-native";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";

// screens
import { MenuSettings } from "../../screens/mainScreens/MenuSettings/MenuSettings";
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
