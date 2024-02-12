import React, { FunctionComponent, useContext, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";

// types
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

// providers
import { responsiveLayoutContext } from "../../providers/responsiveLayout/responsiveLayout.provider";

// components
import { MenuBurgerButton } from "../../components/MenuBurgerButton/MenuBurgerButton";

// helps
import { useMainTabs } from "./useMainTabs";

// constants
import { PATHS_MAIN_TABS } from "../useNavigator.constants";
import { PATHS_EVENTS_SCREENS_HIDE_MAIN_HEADER } from "../EventsStack/eventsStack.constants";

// types
import { RootMainTabsParamList } from "../Navigators.types";

// hooks
import colors from "../../../styles/colors";
import { styles } from "./MainTabs.styles";

const Tab = createBottomTabNavigator<RootMainTabsParamList>();

export const MainTabs: FunctionComponent = () => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  const { mainTabs } = useMainTabs();
  const { durationHeight } = useContext(responsiveLayoutContext);
  const colorsGradient = useMemo(
    () => [colors.californiaOrange, colors.blazeOrange],
    []
  );
  const containerStyles = useMemo(
    () => [styles.mainContainer, { bottom: -durationHeight }],
    [durationHeight]
  );
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const tabBar = ({ state: { index }, navigation }: BottomTabBarProps) => (
    <View style={containerStyles}>
      <View style={styles.absoluteContainer}>
        <LinearGradient
          colors={colorsGradient}
          start={startGradient}
          end={endGradient}
          locations={locationsGradient}
          style={styles.container}
        >
          {mainTabs.map((screen, indexScreen) => {
            const isActive = indexScreen === index;
            const Icon = isActive
              ? mainTabs[indexScreen].tabBarIconSelect
              : mainTabs[indexScreen].tabBarIcon;
            return (
              <View key={`tab-button-${screen.id}`}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screen.name, {
                      screen: screen.mainScreen,
                    });
                  }}
                >
                  <Icon width={32} height={32} />
                </TouchableOpacity>
              </View>
            );
          })}
        </LinearGradient>
      </View>
    </View>
  );

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
    }),
    []
  );

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={tabBar}
      initialRouteName={PATHS_MAIN_TABS.map}
    >
      {mainTabs.map((screen) => (
        <Tab.Screen
          key={`tab-screen-${screen.id}`}
          name={screen.name}
          component={screen.component}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route);
            const isHideHeader = routeName
              ? PATHS_EVENTS_SCREENS_HIDE_MAIN_HEADER.includes(routeName)
              : false;
            return {
              headerShown: screen.headerShown && !isHideHeader,
              headerTitle: screen.title,
              headerTitleAlign: "center",
              headerLeft: () => <MenuBurgerButton onPress={onShowMenu} />,
              headerLeftContainerStyle: styles.headerLeftContainerStyle,
              headerRightContainerStyle: { paddingRight: 16 },
              headerShadowVisible: false,
            };
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
