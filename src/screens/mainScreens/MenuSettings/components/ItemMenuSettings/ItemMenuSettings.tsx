import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity } from "react-native";

// types
import { IconType } from "../../../../../icons/icon.types";
import { styles } from "./ItemMenuSettings.styles";

type ItemMenuSettingsProps = {
  title: string;
  Icon: (originalProps: IconType) => React.ReactNode;
  onPress: () => void;
};

export const ItemMenuSettings: FunctionComponent<ItemMenuSettingsProps> = ({
  title,
  Icon,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon width={24} height={24} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
