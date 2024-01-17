import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { styles } from "./MenuSettings.styles";
import { Trans } from "@lingui/macro";
import { IconChat, IconClose } from "../../../icons/components";
import colors from "../../../../styles/colors";
import { ItemMenuSettings } from "./components/ItemMenuSettings/ItemMenuSettings";
import { IconType } from "../../../icons/icon.types";
import { localesContext } from "../../../../localization/localization.provider";

type MenuSettingsProps = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

export const MenuSettings: FunctionComponent<MenuSettingsProps> = ({
  navigation,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const title = "MENU SETTINGS SCREEN";
  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingTop: heightStatusBar,
      },
    ],
    [heightStatusBar]
  );

  const onCloseMenu = () => {
    navigation.closeDrawer();
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.boxHeaderEmpty} />
        <Text style={styles.titleHeader}>
          <Trans>Settings</Trans>
        </Text>
        <TouchableOpacity onPress={onCloseMenu}>
          <IconClose width={24} height={24} fill={colors.blackCoffee} />
        </TouchableOpacity>
      </View>
      <Text>{title}</Text>
      <View style={styles.lineWhite} />
      <ItemMenuSettings
        title={i18n._("SOS signal notification")}
        Icon={IconChat}
        onPress={() => {}}
      />
      <View style={styles.lineWhite} />
      <ItemMenuSettings
        title={i18n._("Share the app")}
        Icon={IconChat}
        onPress={() => {}}
      />
      <View style={styles.lineWhite} />
      <ItemMenuSettings
        title={i18n._("About the service")}
        Icon={IconChat}
        onPress={() => {}}
      />
      <View style={styles.lineWhite} />
      <ItemMenuSettings
        title={i18n._("Terms of use")}
        Icon={IconChat}
        onPress={() => {}}
      />
      <View style={styles.lineWhite} />
      <ItemMenuSettings
        title={i18n._("Privacy policy")}
        Icon={IconChat}
        onPress={() => {}}
      />
    </View>
  );
};
