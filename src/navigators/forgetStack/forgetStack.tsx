import React, { FunctionComponent, useContext, useMemo } from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

// constants
import { THEME_LIGHT } from '../../providers/theme/theme.const';
import { PATHS_FORGET_SCREENS, PATHS_MAIN_SCREENS } from '../useNavigator.constants';

// components
import { HeaderLeft } from '../components/HeaderLeft/HeaderLeft';

// types
import { RootForgetScreensParamList } from '../Navigators.types';

// hooks
import { useForgetStack } from './useForgetStack';
import { useMainRoute } from '../Navigators.helps';

// providers
import { themeContext } from '../../providers/theme/theme.provider';

// styles
import colors from '../../../styles/colors';

const Stack = createNativeStackNavigator<RootForgetScreensParamList>();

export const ForgetStack: FunctionComponent = () => {
  const { params } = useMainRoute(PATHS_MAIN_SCREENS.forget);
  const { theme } = useContext(themeContext);
  const { forgetScreens } = useForgetStack();

  const options = (
    title: string | null,
    navigation: NativeStackNavigationProp<RootForgetScreensParamList>,
  ): NativeStackNavigationOptions => ({
    headerShown: title !== null,
    headerTitle: title || '',
    headerLeft: () => <HeaderLeft navigation={navigation} />,
  });

  const initialParamsPhoneNumber = useMemo(
    () => ({ phoneNumber: params?.phoneNumber }),
    [params?.phoneNumber],
  );

  const contentStyle = useMemo(
    () => ({ backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich }),
    [theme],
  );

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

  const screenOptions: NativeStackNavigationOptions = useMemo(
    () => ({
      contentStyle,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerStyle: mainBackgroundColor,
      headerTitleStyle: mainFontSize,
    }),
    [contentStyle, mainBackgroundColor, mainFontSize],
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {forgetScreens.map(screen => (
        <Stack.Screen
          key={`screen-registration-${screen.id}`}
          name={screen.name}
          component={screen.component}
          initialParams={
            screen.name === PATHS_FORGET_SCREENS.forgetPhone ? initialParamsPhoneNumber : undefined
          }
          options={({
            navigation,
          }: {
            navigation: NativeStackNavigationProp<RootForgetScreensParamList>;
          }) => options(screen.title, navigation)}
        />
      ))}
    </Stack.Navigator>
  );
};
