import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { BackHandler } from "react-native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// constants
import { THEME_LIGHT } from "../providers/ThemeProvider/ThemeProvider.const";

// components
import { Header } from "../components/Header/Header";

// provider
import { themeContext } from "../providers/ThemeProvider/ThemeProvider";

// types
import { RootMainScreensParamList } from "./Navigators.types";

// hooks
import { useNavigators } from "./useNavigator";
import { useAllNavigation } from "./Navigators.helps";

// styles
import colors from "../../styles/colors";

const Stack = createNativeStackNavigator<RootMainScreensParamList>();

export const Navigators: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // TODO create later
        console.log("navigation", navigation);
        console.log("route", navigation.getState());
        return true;
      }
    );
    return () => {
      backHandler.remove();
    };
  }, []);

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
