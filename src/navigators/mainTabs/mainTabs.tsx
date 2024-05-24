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
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { MenuBurgerButton } from "../../components/MenuBurgerButton/MenuBurgerButton";

// hooks
import { useMainTabs } from "./useMainTabs";
import { horizontalScale } from "../../../styles/hooks";

// constants
import { PATHS_MAIN_TABS } from "../useNavigator.constants";
import { PATHS_EVENTS_SCREENS_HIDE_MAIN_HEADER } from "../EventsStack/eventsStack.constants";

// types
import { RootMainTabsParamList } from "../Navigators.types";

// styles
import colors from "../../../styles/colors";
import { styles } from "./MainTabs.styles";
import { responsiveLayoutContext } from "../../providers/responsiveLayout/responsiveLayout.provider";

const Tab = createBottomTabNavigator<RootMainTabsParamList>();

export const MainTabs: FunctionComponent = () => {
  const navigation = useNavigation<DrawerNavigationHelpers>();
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useContext(localesContext);
  const { durationHeight } = useContext(responsiveLayoutContext);
  const { mainTabs } = useMainTabs();
  const colorsGradient = useMemo(
    () => [colors.californiaOrange, colors.blazeOrange],
    []
  );
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  const absoluteContainerStyles = useMemo(
    () => [
      styles.absoluteContainer,
      {
        bottom: -durationHeight,
      },
    ],
    [durationHeight]
  );

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingBottom: bottom,
      },
    ],
    [bottom]
  );

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const tabBar = ({ state: { index }, navigation }: BottomTabBarProps) => (
    <View style={absoluteContainerStyles}>
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        locations={locationsGradient}
        style={containerStyles}
      >
        {mainTabs.map((screen, indexScreen) => {
          const isActive = indexScreen === index;
          const Icon = isActive
            ? mainTabs[indexScreen].tabBarIconSelect
            : mainTabs[indexScreen].tabBarIcon;
          return (
            <View key={`tab-button-${screen.id}`}>
              <TouchableOpacity
                accessibilityLabel={i18n._("Select tab {tabName}", {
                  tabName: screen.title,
                })}
                onPress={() => {
                  navigation.navigate(screen.name, {
                    screen: screen.mainScreen,
                  });
                }}
                style={styles.button}
              >
                <Icon
                  width={horizontalScale(32)}
                  height={horizontalScale(32)}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </LinearGradient>
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
