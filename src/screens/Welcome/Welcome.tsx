import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { Trans } from "@lingui/macro";
import { User } from "@react-native-google-signin/google-signin";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { userContext } from "../../providers/user/user.provider";
import { biometricAuthenticatorContext } from "../../providers/biometricAuthenticator/biometricAuthenticator.provider";
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// helps
import { useAllNavigation } from "../../navigators/Navigators.helps";

// components
import { Logo } from "../../components/Logo/Logo";
import { ImageCache } from "../../components/ImageCache/ImageCache";
import { Socials } from "../../components/Socials/Socials";

// images
import imageSplash from "../../../assets/splash.png";
import imageCountryUk from "../../../images/icon-country-uk.png";
import imageCountryUs from "../../../images/icon-country-us.png";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from "../../navigators/useNavigator.constants";

// styles
import { styles } from "./Welcome.styles";

export const Welcome: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { isFaceId, isTouchId } = useContext(biometricAuthenticatorContext);
  const { language, setLanguage } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { signInGoogle } = useContext(userContext);

  const iconLanguage = useMemo(
    () => (language === "en" ? imageCountryUs : imageCountryUk),
    [language]
  );
  const showLanguage = useMemo(
    () => (language === "uk" ? "ua" : language),
    [language]
  );

  const onChangeLanguage = () => {
    if (language === "uk") setLanguage("en");
    else setLanguage("uk");
  };

  const onSelect = async (userData: User) => {
    const user = await signInGoogle(userData);
    if (user?.isCheckBiometric === null && (isFaceId || isTouchId)) {
      if (isTouchId)
        navigation.navigate(PATHS_MAIN_SCREENS.registration, {
          screen: PATHS_REGISTRATION_SCREENS.registrationTouchId,
        });
      else if (isFaceId)
        navigation.navigate(PATHS_MAIN_SCREENS.registration, {
          screen: PATHS_REGISTRATION_SCREENS.registrationFaceId,
        });
      else if (user.isNewUser)
        navigation.navigate(PATHS_MAIN_SCREENS.registration, {
          screen: PATHS_REGISTRATION_SCREENS.registrationLocation,
        });
      else navigation.navigate(PATHS_MAIN_SCREENS.main);
    } else if (user?.isNewUser)
      navigation.navigate(PATHS_MAIN_SCREENS.registration, {
        screen: PATHS_REGISTRATION_SCREENS.registrationLocation,
      });
    else navigation.navigate(PATHS_MAIN_SCREENS.main);
  };

  const containerStyles = useMemo(
    () => [
      styles.containerBlur,
      {
        paddingTop: heightStatusBar,
      },
    ],
    [heightStatusBar]
  );

  return (
    <ImageBackground style={styles.container} source={imageSplash}>
      <BlurView intensity={8} style={containerStyles}>
        <View style={styles.containerLanguage}>
          <TouchableOpacity
            onPress={onChangeLanguage}
            style={styles.buttonLanguage}
          >
            <ImageCache imageSrc={iconLanguage} style={styles.iconLanguage} />
            <Text style={styles.titleLanguage}>{showLanguage}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogo}>
          <Logo />
        </View>
        <View style={styles.containerTitles}>
          <Text style={styles.title}>
            <Trans>Hello!</Trans>
          </Text>
          <Text style={styles.subTitle}>
            <Trans>We're glad to see you on our service.</Trans>{" "}
          </Text>
          <Text style={styles.subTitle}>
            <Trans>Authorize using:</Trans>
          </Text>
          <Socials
            styleContainer={styles.containerSocials}
            onChange={onSelect}
          />
        </View>
      </BlurView>
    </ImageBackground>
  );
};
