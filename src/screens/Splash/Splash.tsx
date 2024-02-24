import React, { FunctionComponent, useContext, useEffect } from "react";
import { Image, View } from "react-native";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";
import { redirectToScreen } from "../screens.hooks";

// providers
import { userContext } from "../../providers/UserProvider/UserProvider";
import { biometricAuthenticatorContext } from "../../providers/BiometricProvider/BiometricProvider";
import { analyticsContext } from "../../providers/AnalyticsProvider/AnalyticsProvider";

// components
import { Logo } from "../../components/Logo/Logo";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigators/useNavigator.constants";
import { METHOD_NAME_AUTH_AUTO } from "../../providers/AnalyticsProvider/AnalyticsProvider.constants";

// images
import splashScreenImage from "../../../assets/splash.png";

// styles
import { styles } from "./Splash.styles";

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { meUser } = useContext(userContext);
  const { onLogLogin } = useContext(analyticsContext);
  const { isFaceId, isTouchId } = useContext(biometricAuthenticatorContext);

  const authorizationInitializer = async () => {
    const result = await meUser();
    await onLogLogin(METHOD_NAME_AUTH_AUTO);
    if (result) redirectToScreen(navigation, result, isFaceId, isTouchId);
    else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
  };

  useEffect(() => {
    authorizationInitializer();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={splashScreenImage}
        resizeMode="cover"
        style={styles.image}
      />
      <Logo />
    </View>
  );
};
