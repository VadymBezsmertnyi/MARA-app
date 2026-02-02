import React, { FunctionComponent } from "react";
import { TouchableOpacity, Text, View } from "react-native";

// providers
import { useThemeProvider } from "../../../../../providers/ThemeProvider/ThemeProvider";

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
  const { theme } = useThemeProvider();

  return (
    <View style={styles.container}>
      <MenuBurgerButton onPress={onMenuPress} />
      <TouchableOpacity style={styles.addButton} onPress={onAddChannelPress}>
        <Text style={styles.addButtonText}>+ Add Channel</Text>
      </TouchableOpacity>
    </View>
  );
};
