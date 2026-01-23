import React, { FunctionComponent, useMemo } from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { User } from "@react-native-google-signin/google-signin";

// providers
import { useUserProvider } from "../../providers/UserProvider/UserProvider";
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";
import { useAnalyticsProvider } from "../../providers/AnalyticsProvider/AnalyticsProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

// helps
import { useAllNavigation } from "../../navigators/Navigators.helps";

// components
import { Socials } from "./components/Socials/Socials";
import { ChangeLanguage } from "../../components/ChangeLanguage/ChangeLanguage";

// images
import imageSplash from "../../../assets/splash.png";

// constants
import {
  METHOD_NAME_AUTH_APPLE,
  METHOD_NAME_AUTH_FACEBOOK,
  METHOD_NAME_AUTH_GOOGLE,
} from "../../providers/AnalyticsProvider/AnalyticsProvider.constants";

// hooks
import { redirectToScreen } from "../screens.hooks";

// styles
import { styles } from "./Welcome.styles";

export const Welcome: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { i18n } = useLocalesProvider();
  const { onLogLogin, onLogSignUp } = useAnalyticsProvider();
  const { heightStatusBar } = useThemeProvider();
  const { signInGoogle, signInFacebook, signInApple } = useUserProvider();

  const onSelectGoogle = async (userData: User) => {
    const user = await signInGoogle(userData);

    if (user) {
      if (user.isNewUser) await onLogSignUp(METHOD_NAME_AUTH_GOOGLE);
      else await onLogLogin(METHOD_NAME_AUTH_GOOGLE);
      redirectToScreen(navigation, user);
    }
  };

  const onSelectApple = async (identityToken: string) => {
    const user = await signInApple(identityToken);

    if (user) {
      if (user.isNewUser) await onLogSignUp(METHOD_NAME_AUTH_APPLE);
      else await onLogLogin(METHOD_NAME_AUTH_APPLE);
      redirectToScreen(navigation, user);
    }
  };

  const onSelectFacebook = async (accessToken: string) => {
    const user = await signInFacebook(accessToken);

    if (user) {
      if (user.isNewUser) await onLogSignUp(METHOD_NAME_AUTH_FACEBOOK);
      else await onLogLogin(METHOD_NAME_AUTH_FACEBOOK);
      redirectToScreen(navigation, user);
    }
  };

  const containerStyles = useMemo(
    () => [
      styles.containerBody,
      {
        paddingTop: heightStatusBar,
      },
    ],
    [heightStatusBar]
  );

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.containerImage} source={imageSplash} />
      <BlurView
        intensity={Platform.OS === "ios" ? 15 : undefined}
        blurReductionFactor={Platform.OS === "android" ? 25 : undefined}
        style={styles.containerBlur}
      />
      <View style={containerStyles}>
        <View style={styles.containerLanguage}>
          <ChangeLanguage />
        </View>
        <View style={styles.containerTitles}>
          <Text style={styles.title}>{i18n._("Welcome to our service.")}</Text>
          <Text style={styles.subTitle}>{i18n._("Log in using:")}</Text>
          <Socials
            styleContainer={styles.containerSocials}
            onChangeGoogle={onSelectGoogle}
            onChangeFacebook={onSelectFacebook}
            onChangeApple={onSelectApple}
          />
        </View>
      </View>
    </View>
  );
};
