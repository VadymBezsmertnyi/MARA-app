import React, { FunctionComponent, useContext, useMemo } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Trans, t } from '@lingui/macro';
import { LinearGradient } from 'expo-linear-gradient';

// components
import { ButtonCustom } from '../../components/ButtonCustom/ButtonCustom';

// providers
import { localesContext } from '../../../localization/localization.provider';
import { themeContext } from '../../providers/theme/theme.provider';

// constants
import colors from '../../../styles/colors';
import { THEME_DARK, THEME_LIGHT } from '../../providers/theme/theme.const';

// images
import { backgroundWelcomeFirst } from '../../../images';

// constants
import { PATHS_MAIN_SCREENS } from '../../navigators/useNavigator.constants';

// styles
import { styles } from './Welcome.styles';

export const Welcome: FunctionComponent = () => {
  const { i18n } = useContext(localesContext);
  const { theme } = useContext(themeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const colorsLinearGradient = useMemo(
    () => [
      colors.white,
      colors.whiteTransparentFifteen,
      colors.whiteTransparentFifteen,
      colors.white,
    ],
    [],
  );
  const colorsLinearGradientDark = useMemo(
    () => [
      colors.blackRangoonGreen,
      colors.blackRich07,
      colors.blackRich07,
      colors.blackRangoonGreen,
    ],
    [],
  );
  const locationsLinearGradient = useMemo(() => [0.002, 0.5, 0.3, 0.8], []);
  const locationsLinearGradientDark = useMemo(() => [0, 0.3, 0.5, 0.9], []);
  const styleTitleMain = useMemo(
    () => [styles.titleMain, theme === THEME_DARK ? styles.titlesDark : null],
    [theme],
  );
  const styleTitleSub = useMemo(
    () => [styles.titleSub, theme === THEME_DARK ? styles.titlesDark : null],
    [theme],
  );
  const onAuthorization = () => {
    navigation.navigate(PATHS_MAIN_SCREENS.authorization);
  };
  const onRegistration = () => {
    navigation.navigate(PATHS_MAIN_SCREENS.registration);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.logoContainer}
        source={backgroundWelcomeFirst as ImageSourcePropType}
      >
        <LinearGradient
          colors={theme === THEME_LIGHT ? colorsLinearGradient : colorsLinearGradientDark}
          locations={theme === THEME_LIGHT ? locationsLinearGradient : locationsLinearGradientDark}
          style={styles.overlay}
        />
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
        <View style={styles.titles}>
          <Text style={styleTitleMain}>
            <Trans>Hello!</Trans>
          </Text>
          <Text style={styleTitleSub}>
            <Trans>We're glad to see you on our service.</Trans>
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.buttons}>
        <ButtonCustom
          title={t(i18n)`Sing in`}
          onSubmit={onAuthorization}
          styleContainer={styles.buttonLogin}
        />
        <ButtonCustom
          title={t(i18n)`Registration`}
          onSubmit={onRegistration}
          type="transparent"
          styleContainer={styles.buttonRegistration}
        />
      </View>
    </View>
  );
};
