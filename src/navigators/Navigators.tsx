import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { BackHandler } from "react-native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainerRef } from "@react-navigation/native";

// constants
import { THEME_LIGHT } from "../providers/ThemeProvider/ThemeProvider.const";
import {
  PATHS_EVENTS_SCREENS,
  PATHS_MAIN_SCREENS,
  PATHS_MAIN_TABS,
  PATHS_HELP_SCREENS,
  PATHS_SETTINGS_SCREENS,
  PATHS_WORKSHOP_SCREENS,
} from "./useNavigator.constants";

// components
import { Header } from "../components/Header/Header";

// provider
import { useThemeProvider } from "../providers/ThemeProvider/ThemeProvider";

// types
import {
  RootAllScreensParamList,
  RootMainScreensParamList,
} from "./Navigators.types";

// hooks
import { useNavigators } from "./useNavigator";

// styles
import colors from "../../styles/colors";

const Stack = createNativeStackNavigator<RootMainScreensParamList>();

type NavigatorsProps = {
  currentRouteName: string | null;
  navigation: NavigationContainerRef<RootAllScreensParamList> | null;
};

export const Navigators: FunctionComponent<NavigatorsProps> = ({
  currentRouteName,
  navigation,
}) => {
  const { theme } = useThemeProvider();
  const { mainScreens } = useNavigators();

  const mainBackgroundColor = useMemo(
    () => ({
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [theme]
  );

  const mainFontSize = useMemo(
    () => ({
      color: theme === THEME_LIGHT ? colors.blackCoffee : colors.white,
    }),
    [theme]
  );

  const options = (
    title: string,
    headerShown: boolean,
    gestureEnabled = true
  ): NativeStackNavigationOptions => ({
    headerShown,
    header: () => <Header title={title} />,
    gestureEnabled,
  });

  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      contentStyle: mainBackgroundColor,
      headerStyle: mainBackgroundColor,
      headerTitleStyle: mainFontSize,
    }),
    [mainBackgroundColor, mainFontSize]
  );

  const onPressBack = useCallback(() => {
    if (navigation && currentRouteName) {
      const stateNavigator = navigation.getState();
      const mainName = stateNavigator.routes[stateNavigator.index].name;
      const tabsNames = [
        PATHS_WORKSHOP_SCREENS.workshopMain,
        PATHS_MAIN_TABS.map,
        PATHS_EVENTS_SCREENS.eventsMain,
        PATHS_HELP_SCREENS.helpMain,
        PATHS_SETTINGS_SCREENS.settingsMain,
      ] as string[];
      const isStartTab = tabsNames.includes(currentRouteName);
      if (
        (isStartTab && mainName === PATHS_MAIN_SCREENS.main) ||
        (currentRouteName === PATHS_MAIN_SCREENS.welcome &&
          mainName === PATHS_MAIN_SCREENS.welcome)
      )
        BackHandler.exitApp();
      else navigation.goBack();
    }

    return true;
  }, [currentRouteName]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onPressBack
    );
    return () => {
      backHandler.remove();
    };
  }, [currentRouteName]);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {mainScreens.map((mainScreen) => (
        <Stack.Screen
          key={`screen_${mainScreen.name}`}
          name={mainScreen.name}
          component={mainScreen.component}
          options={options(
            mainScreen.title,
            mainScreen.headerShown,
            mainScreen.gestureEnabled
          )}
        />
      ))}
    </Stack.Navigator>
  );
};
