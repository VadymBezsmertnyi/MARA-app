import React, { FunctionComponent, useContext, useMemo } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// types
import { RootMarketScreensParamList } from "../Navigators.types";

// constants
import { THEME_LIGHT } from "../../providers/ThemeProvider/ThemeProvider.const";

// components
import { Header } from "../../components/Header/Header";

// hooks
import { useMarketStack } from "./useMarketStack";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// styles
import colors from "../../../styles/colors";

const Stack = createNativeStackNavigator<RootMarketScreensParamList>();

export const MarketStack: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { marketScreens } = useMarketStack();

  const options = (
    title: string | null,
    headerShown: boolean
  ): NativeStackNavigationOptions => ({
    headerShown,
    header: () => <Header title={title || ""} />,
  });

  const contentStyle = useMemo(
    () => ({
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [theme]
  );

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

  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      contentStyle,
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: mainBackgroundColor,
      headerTitleStyle: mainFontSize,
    }),
    [contentStyle, mainBackgroundColor, mainFontSize]
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {marketScreens.map((screen) => (
        <Stack.Screen
          key={`screen-news-${screen.id}`}
          name={screen.name}
          component={screen.component}
          options={options(screen.title, screen.headerShown)}
        />
      ))}
    </Stack.Navigator>
  );
};
