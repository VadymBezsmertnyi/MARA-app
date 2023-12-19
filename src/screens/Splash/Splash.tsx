import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Image, View } from 'react-native';

// hooks
import { useAllNavigation } from '../../navigators/Navigators.helps';

// providers
import { userContext } from '../../providers/user/user.provider';

// constants
import { PATHS_MAIN_SCREENS } from '../../navigators/useNavigator.constants';

// images
import splashScreenImage from '../../../assets/splash.png';

// styles
import { styles } from './Splash.styles';

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { meUser } = useContext(userContext);

  const authorizationInitializer = async () => {
    const result = await meUser();
    if (result) navigation.navigate(PATHS_MAIN_SCREENS.main);
    else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
    return {};
  };

  useEffect(() => {
    authorizationInitializer();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashScreenImage} resizeMode="contain" style={styles.image} />
    </View>
  );
};
