import React, { FunctionComponent, useEffect } from "react";
import { Image, View } from "react-native";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";
import { redirectToScreen } from "../screens.hooks";

// providers
import { useUserProvider } from "../../providers/UserProvider/UserProvider";
import { useBiometricProvider } from "../../providers/BiometricProvider/BiometricProvider";
import { useAnalyticsProvider } from "../../providers/AnalyticsProvider/AnalyticsProvider";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigators/useNavigator.constants";
import { METHOD_NAME_AUTH_AUTO } from "../../providers/AnalyticsProvider/AnalyticsProvider.constants";

// images
import splashScreenImage from "../../../assets/splash.png";

// styles
import { styles } from "./Splash.styles";

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { meUser } = useUserProvider();
  const { onLogLogin } = useAnalyticsProvider();
  const { isFaceId, isTouchId } = useBiometricProvider();

  const authorizationInitializer = async () => {
    const result = await meUser(false);
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
    </View>
  );
};
