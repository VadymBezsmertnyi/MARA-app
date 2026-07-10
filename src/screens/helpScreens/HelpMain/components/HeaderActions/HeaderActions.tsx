import React, { FunctionComponent } from "react";
import { TouchableOpacity, Text, View } from "react-native";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { MenuBurgerButton } from "../../../../../components/MenuBurgerButton/MenuBurgerButton";

// styles
import { styles } from "./HeaderActions.styles";

type HeaderActionsProps = {
  onMenuPress: () => void;
  onAddChannelPress: () => void;
};

export const HeaderActions: FunctionComponent<HeaderActionsProps> = ({
  onMenuPress,
  onAddChannelPress,
}) => {
  const { i18n } = useLocalesProvider();

  return (
    <View style={styles.container}>
      <MenuBurgerButton onPress={onMenuPress} />
      <TouchableOpacity style={styles.addButton} onPress={onAddChannelPress}>
        <Text style={styles.addButtonText}>+ {i18n._("Add Channel")}</Text>
      </TouchableOpacity>
    </View>
  );
};
