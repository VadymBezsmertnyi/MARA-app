import React, { FunctionComponent, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// hooks
import { useAllNavigation } from '../../../../../navigators/Navigators.helps';

// constants
import { PATHS_MAIN_SCREENS } from '../../../../../navigators/useNavigator.constants';

// providers
import { userContext } from '../../../../../providers/user/user.provider';

// styles
import { styles } from './Menu.styles';

type MenuProps = {
  isShowMenu: boolean;
  setIsShowMenu: (value: boolean) => void;
};

export const Menu: FunctionComponent<MenuProps> = ({ isShowMenu, setIsShowMenu }) => {
  const navigation = useAllNavigation();
  const { exitUser } = useContext(userContext);
  const toggleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  const onExitUser = async () => {
    await exitUser();
    navigation.navigate(PATHS_MAIN_SCREENS.welcome);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleShowMenu} style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
      {isShowMenu ? (
        <View style={styles.list}>
          <TouchableOpacity onPress={onExitUser}>
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
