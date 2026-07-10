import React, { FunctionComponent, useEffect } from "react";
import { Image, View } from "react-native";

// redux
import { useLazyGetMeQuery } from "../../storeRedux/api";
import { getTokens } from "../../storeRedux/apis/user/user.helpers";

// providers
import { useAnalyticsProvider } from "../../providers/AnalyticsProvider/AnalyticsProvider";

// hooks
import { useAllNavigation } from "../../navigators/Navigators.helps";
import { redirectToScreen } from "../screens.hooks";

// constants
import { PATHS_MAIN_SCREENS } from "../../navigators/useNavigator.constants";
import { METHOD_NAME_AUTH_AUTO } from "../../providers/AnalyticsProvider/AnalyticsProvider.constants";

// images
import splashScreenImage from "../../../assets/splash.png";

// styles
import { styles } from "./Splash.styles";

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const [getMe] = useLazyGetMeQuery();
  const { onLogLogin } = useAnalyticsProvider();

  const authorizationInitializer = async () => {
    const token = await getTokens();
    if (token) {
      const result = await getMe();
      await onLogLogin(METHOD_NAME_AUTH_AUTO);
      if (result.data?.userData)
        redirectToScreen(navigation, result.data.userData);
      else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
    } else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
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
