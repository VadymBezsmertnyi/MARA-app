import React, { FunctionComponent, useContext, useEffect } from "react";
import { Image, View } from "react-native";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";
import { redirectToScreen } from "../screens.hooks";

// providers
import { userContext } from "../../providers/user/user.provider";
import { biometricAuthenticatorContext } from "../../providers/biometricAuthenticator/biometricAuthenticator.provider";

// components
import { Logo } from "../../components/Logo/Logo";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigators/useNavigator.constants";

// images
import splashScreenImage from "../../../assets/splash.png";

// styles
import { styles } from "./Splash.styles";

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { meUser } = useContext(userContext);
  const { isFaceId, isTouchId } = useContext(biometricAuthenticatorContext);

  const authorizationInitializer = async () => {
    const result = await meUser();
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
