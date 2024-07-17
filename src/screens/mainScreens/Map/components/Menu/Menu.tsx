import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// hooks
import { useMainTabsNavigation } from "../../../../../navigators/Navigators.helps";

// styles
import { styles } from "./Menu.styles";

export const Menu: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  const navigation = useMainTabsNavigation();

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableOpacity
      accessibilityLabel={i18n._("Toggle show menu")}
      onPress={onShowMenu}
      style={styles.container}
    >
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
