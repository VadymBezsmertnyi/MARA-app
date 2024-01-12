import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";

// styles
import { styles } from "./Logo.styles";

export const Logo: FunctionComponent = () => (
  <View style={styles.containerLogo}>
    <Text style={styles.titleLogo}>Logo</Text>
  </View>
);
