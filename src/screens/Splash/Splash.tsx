import React, { FunctionComponent, useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";

// providers
import { userContext } from "../../providers/user/user.provider";
import { themeContext } from "../../providers/theme/theme.provider";

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
  const { setIsSplash } = useContext(themeContext);

  const authorizationInitializer = async () => {
    const result = await meUser();
    if (result) navigation.navigate(PATHS_MAIN_SCREENS.main);
    else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
    setIsSplash(false);
    return {};
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
