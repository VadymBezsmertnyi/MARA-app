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

// hooks
import { redirectToScreen } from "../screens.hooks";

// styles
import { styles } from "./Welcome.styles";

export const Welcome: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { isFaceId, isTouchId } = useContext(biometricAuthenticatorContext);
  const { language, setLanguage } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { signInGoogle, signInFacebook } = useContext(userContext);

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

  const onSelectGoogle = async (userData: User) => {
    const user = await signInGoogle(userData);
    if (user) redirectToScreen(navigation, user, isFaceId, isTouchId);
  };

  const onSelectFacebook = async (accessToken: string) => {
    const user = await signInFacebook(accessToken);
    if (user) redirectToScreen(navigation, user, isFaceId, isTouchId);
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
            onChangeGoogle={onSelectGoogle}
            onChangeFacebook={onSelectFacebook}
          />
        </View>
      </BlurView>
    </ImageBackground>
  );
};
