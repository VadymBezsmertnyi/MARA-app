import React, { FunctionComponent, useContext } from "react";
import { Text, View } from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { localesContext } from "../../../../localization/localization.provider";

// styles
import { styles } from "./SettingsProducts.styles";

type SettingsProductsProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsProducts: FunctionComponent<SettingsProductsProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
};
