import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './MenuBurgerButton.styles';

type MenuBurgerButtonProps = {
  onPress?: () => void;
};

export const MenuBurgerButton: FunctionComponent<MenuBurgerButtonProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.menu}>
      <View style={styles.line} />
      <View style={styles.line} />
      <View style={styles.line} />
    </View>
  </TouchableOpacity>
);
