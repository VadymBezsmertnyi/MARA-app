import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";

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
    <View>
      <TouchableOpacity onPress={onShowMenu} style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
