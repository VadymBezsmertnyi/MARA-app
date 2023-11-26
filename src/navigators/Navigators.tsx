import React, { FunctionComponent, useContext, useMemo } from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// constants
import { THEME_LIGHT } from '../providers/theme/theme.const';

// components
import { HeaderLeft } from './components/HeaderLeft/HeaderLeft';

// provider
import { themeContext } from '../providers/theme/theme.provider';

// types
import { RootMainScreensParamList } from './Navigators.types';

// hooks
import { useNavigators } from './useNavigator';

// styles
import colors from '../../styles/colors';

const Stack = createNativeStackNavigator<RootMainScreensParamList>();

export const Navigators: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { mainScreens } = useNavigators();

  const mainBackgroundColor = useMemo(
    () => ({
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [theme],
  );

  const mainFontSize = useMemo(
    () => ({
      color: theme === THEME_LIGHT ? colors.blackCoffee : colors.white,
    }),
    [theme],
  );

  const options = (
    title: string,
    headerShown: boolean,
    navigation: NativeStackNavigationProp<RootMainScreensParamList>,
    gestureEnabled = true,
  ): NativeStackNavigationOptions => ({
    headerShown,
    title,
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    headerLeft: () => <HeaderLeft navigation={navigation} />,
    gestureEnabled,
  });

  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      contentStyle: mainBackgroundColor,
      headerStyle: mainBackgroundColor,
      headerTitleStyle: mainFontSize,
    }),
    [mainBackgroundColor, mainFontSize],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {mainScreens.map(mainScreen => (
        <Stack.Screen
          key={`screen_${mainScreen.name}`}
          name={mainScreen.name}
          component={mainScreen.component}
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<RootMainScreensParamList>;
          }) =>
            options(mainScreen.title, mainScreen.headerShown, navigation, mainScreen.gestureEnabled)
          }
        />
      ))}
    </Stack.Navigator>
  );
};
