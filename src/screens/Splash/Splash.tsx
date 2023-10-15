import React, { FunctionComponent, useContext } from 'react';
import { Text, View } from 'react-native';

// hooks
import { useInitializer } from '../../useInitializer/useInitializer';
import { useAllNavigation } from '../../navigators/Navigators.helps';

// providers
import { userContext } from '../../providers/user/user.provider';

// constants
import { PATHS_MAIN_SCREENS } from '../../navigators/useNavigator.constants';

// styles
import { styles } from './Splash.styles';

export const Splash: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { meUser } = useContext(userContext);

  useInitializer(async function authorizationScreenInitializer() {
    const result = await meUser();
    if (result) navigation.navigate(PATHS_MAIN_SCREENS.main);
    else navigation.navigate(PATHS_MAIN_SCREENS.welcome);
    return {};
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash screen</Text>
    </View>
  );
};
