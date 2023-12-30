import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// constants
import { THEME_LIGHT } from "../../providers/theme/theme.const";

// components
import { Header } from "../../components/Header/Header";

// helps
import { useNewsStack } from "./useNewsStack";
import { getActiveRouteName } from "../Navigators.helps";

// providers
import { themeContext } from "../../providers/theme/theme.provider";
import { modalsSheetContext } from "../../providers/ModalsSheetProvider/ModalsSheetProvider";

// styles
import colors from "../../../styles/colors";

const Stack = createNativeStackNavigator();

export const NewsStack: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { setLocation } = useContext(modalsSheetContext);
  const { newsScreens } = useNewsStack();
  const navigation = useNavigation();
  const [routeName, setRouteName] = useState("");
  const activeRouteName = getActiveRouteName(navigation.getState());

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

  useEffect(() => {
    if (activeRouteName && activeRouteName !== routeName) {
      setRouteName(activeRouteName);
      setLocation(null);
    }
  }, [activeRouteName]);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {newsScreens.map((screen) => (
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
