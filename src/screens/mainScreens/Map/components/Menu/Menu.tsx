import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// hooks
import { useMainTabsNavigation } from "../../../../../navigators/Navigators.helps";

// styles
import { styles } from "./Menu.styles";

export const Menu: FunctionComponent = () => {
  const navigation = useMainTabsNavigation();

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableOpacity onPress={onShowMenu} style={styles.container}>
      <Shadow stretch>
        <View style={styles.menu}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};
