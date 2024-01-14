import React, { FunctionComponent, useContext, useMemo } from "react";
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// constants
import { THEME_LIGHT } from "../../providers/ThemeProvider/ThemeProvider.const";

// components
import { HeaderLeft } from "../components/HeaderLeft/HeaderLeft";

// types
import { RootRegistrationScreensParamList } from "../Navigators.types";

// hooks
import { useRegistrationStack } from "./useRegistrationStack";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// styles
import colors from "../../../styles/colors";
import { ResponsiveLayoutProvider } from "../../providers/responsiveLayout/responsiveLayout.provider";

const Stack = createNativeStackNavigator();

export const RegistrationStack: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { registrationScreens } = useRegistrationStack();

  const options = (
    title: string | null,
    navigation: NativeStackNavigationProp<RootRegistrationScreensParamList>
  ): NativeStackNavigationOptions => ({
    headerShown: title !== null,
    headerTitle: title || "",
    headerLeft: () => <HeaderLeft navigation={navigation} />,
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
      {registrationScreens.map((screen) => (
        <Stack.Screen
          key={`screen-registration-${screen.id}`}
          name={screen.name}
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<RootRegistrationScreensParamList>;
          }) => options(screen.title, navigation)}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};
