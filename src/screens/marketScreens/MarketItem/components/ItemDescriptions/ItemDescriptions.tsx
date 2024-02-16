import React, { FunctionComponent } from "react";
import { Text } from "react-native";

// styles
import { styles } from "./ItemDescriptions.styles";

type ItemDescriptionsProps = {
  title: string;
  value?: string | null;
};

export const ItemDescriptions: FunctionComponent<ItemDescriptionsProps> = ({
  title,
  value,
}) => {
  if (!value) return null;
  return (
    <Text style={styles.container}>
      {title}: <Text style={styles.value}>{value};</Text>
    </Text>
  );
};
