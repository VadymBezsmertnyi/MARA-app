import React, { FunctionComponent, useMemo } from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// constants
import { THEME_LIGHT } from "../../providers/ThemeProvider/ThemeProvider.const";

// hooks
import { useRegistrationStack } from "./useRegistrationStack";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";

// styles
import colors from "../../../styles/colors";

const Stack = createNativeStackNavigator();

export const RegistrationStack: FunctionComponent = () => {
  const { theme } = useThemeProvider();
  const { registrationScreens } = useRegistrationStack();

  const options = (): NativeStackNavigationOptions => ({
    headerShown: false,
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
      gestureEnabled: false,
    }),
    [contentStyle, mainBackgroundColor, mainFontSize]
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {registrationScreens.map((screen) => (
        <Stack.Screen
          key={`screen-registration-${screen.id}`}
          name={screen.name}
          options={options}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};
