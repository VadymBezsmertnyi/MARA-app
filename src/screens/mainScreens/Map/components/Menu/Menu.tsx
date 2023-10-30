import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';

// styles
import { styles } from './Menu.styles';

type MenuProps = {
  isShowMenu: boolean;
  setIsShowMenu: (value: boolean) => void;
};

export const Menu: FunctionComponent<MenuProps> = ({ isShowMenu, setIsShowMenu }) => {
  const toggleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <TouchableOpacity onPress={toggleShowMenu} style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};
