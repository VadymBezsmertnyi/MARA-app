import React, { FunctionComponent, useMemo } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// types
import { RootHelpScreensParamList } from "../Navigators.types";

// constants
import { THEME_LIGHT } from "../../providers/ThemeProvider/ThemeProvider.const";

// components
import { Header } from "../../components/Header/Header";

// hooks
import { useHelpStack } from "./useHelpStack";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";

// styles
import colors from "../../../styles/colors";

const Stack = createNativeStackNavigator<RootHelpScreensParamList>();

export const HelpStack: FunctionComponent = () => {
  const { theme } = useThemeProvider();
  const { helpScreens } = useHelpStack();

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
      {helpScreens.map((screen) => (
        <Stack.Screen
          key={`screen-help-${screen.id}`}
          name={screen.name}
          component={screen.component}
          options={options(screen.title, screen.headerShown)}
        />
      ))}
    </Stack.Navigator>
  );
};
