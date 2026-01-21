import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import { RootHelpScreensParamList } from "../../../navigators/Navigators.types";

// styles
import { styles } from "./HelpMain.styles";

type HelpMainProps = {
  navigation: NativeStackNavigationProp<RootHelpScreensParamList> &
    DrawerNavigationProp<RootHelpScreensParamList>;
};

export const HelpMain: FunctionComponent<HelpMainProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Help Screen</Text>
    </View>
  );
};
