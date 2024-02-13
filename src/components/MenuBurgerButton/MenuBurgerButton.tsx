import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

// styles
import { styles } from "./MenuBurgerButton.styles";

type MenuBurgerButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

export const MenuBurgerButton: FunctionComponent<MenuBurgerButtonProps> = ({
  onPress,
  style,
}) => {
  const styleContainer = useMemo(() => [styles.menu, style], [style]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styleContainer}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};
