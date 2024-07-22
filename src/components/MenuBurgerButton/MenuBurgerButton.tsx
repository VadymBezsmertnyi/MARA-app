import React, { FunctionComponent, useMemo } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

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
  const { i18n } = useLocalesProvider();

  const styleContainer = useMemo(() => [styles.menu, style], [style]);

  return (
    <TouchableOpacity
      accessibilityLabel={i18n._("Toggle show menu")}
      onPress={onPress}
    >
      <View style={styleContainer}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </TouchableOpacity>
  );
};
