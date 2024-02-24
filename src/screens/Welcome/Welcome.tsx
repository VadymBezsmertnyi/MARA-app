import React, { FunctionComponent, useContext, useMemo } from "react";
import { Platform, Text, View } from "react-native";
import { ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { Trans } from "@lingui/macro";
import { User } from "@react-native-google-signin/google-signin";

// providers
import { userContext } from "../../providers/UserProvider/UserProvider";
import { biometricAuthenticatorContext } from "../../providers/BiometricProvider/BiometricProvider";
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";
import { analyticsContext } from "../../providers/AnalyticsProvider/AnalyticsProvider";

// helps
import { useAllNavigation } from "../../navigators/Navigators.helps";

// components
import { Logo } from "../../components/Logo/Logo";
import { Socials } from "../../components/Socials/Socials";
import { ChangeLanguage } from "../../components/ChangeLanguage/ChangeLanguage";

// images
import imageSplash from "../../../assets/splash.png";

// constants
import {
  METHOD_NAME_AUTH_FACEBOOK,
  METHOD_NAME_AUTH_GOOGLE,
} from "../../providers/AnalyticsProvider/AnalyticsProvider.constants";

// hooks
import { redirectToScreen } from "../screens.hooks";

// styles
import { styles } from "./Welcome.styles";

export const Welcome: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { isFaceId, isTouchId } = useContext(biometricAuthenticatorContext);
  const { onLogLogin, onLogSignUp } = useContext(analyticsContext);
  const { heightStatusBar } = useContext(themeContext);
  const { signInGoogle, signInFacebook } = useContext(userContext);

  const onSelectGoogle = async (userData: User) => {
    const user = await signInGoogle(userData);

    if (user) {
      if (user.isNewUser) await onLogSignUp(METHOD_NAME_AUTH_GOOGLE);
      else await onLogLogin(METHOD_NAME_AUTH_GOOGLE);
      redirectToScreen(navigation, user, isFaceId, isTouchId);
    }
  };

  const onSelectFacebook = async (accessToken: string) => {
    const user = await signInFacebook(accessToken);

    if (user) {
      if (user.isNewUser) await onLogSignUp(METHOD_NAME_AUTH_FACEBOOK);
      else await onLogLogin(METHOD_NAME_AUTH_FACEBOOK);
      redirectToScreen(navigation, user, isFaceId, isTouchId);
    }
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
      <BlurView
        intensity={Platform.OS === "ios" ? 15 : undefined}
        blurReductionFactor={Platform.OS === "android" ? 25 : undefined}
        style={styles.container}
      >
        <View style={containerStyles}>
          <View style={styles.containerLanguage}>
            <ChangeLanguage />
          </View>
          <View style={styles.containerLogo}>
            <Logo />
          </View>
          <View style={styles.containerTitles}>
            <Text style={styles.title}>
              <Trans>Hello!</Trans>
            </Text>
            <Text style={styles.subTitle}>
              <Trans>We're glad to see you on our service.</Trans>
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
        </View>
      </BlurView>
    </ImageBackground>
  );
};
