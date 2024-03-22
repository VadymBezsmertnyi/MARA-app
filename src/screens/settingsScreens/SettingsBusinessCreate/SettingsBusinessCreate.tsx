import React, { FunctionComponent, useContext, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";

// components
import { Header } from "../../../components/Header/Header";

// styles
import { styles } from "./SettingsBusinessCreate.styles";

type SettingsBusinessCreateProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsBusinessCreate: FunctionComponent<
  SettingsBusinessCreateProps
> = () => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );
  return (
    <View style={containerStyles}>
      <Header
        title={i18n._("Business profile")}
        isShowRight
        rightStyle={styles.containerRightHeader}
      />
      <ScrollView contentContainerStyle={styles.containerMain}>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </ScrollView>
    </View>
  );
};
