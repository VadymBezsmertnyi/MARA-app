import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { Trans } from "@lingui/macro";

// types
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";

// providers
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { userContext } from "../../../providers/user/user.provider";

// components
import { ItemMenuSettings } from "./components/ItemMenuSettings/ItemMenuSettings";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { ChangeLanguage } from "../../../components/ChangeLanguage/ChangeLanguage";

// icons
import {
  IconAvatarEmpty,
  IconBellGradient,
  IconClose,
  IconDocumentGradient,
  IconLockGradient,
  IconShareGradient,
  IconWheelGradient,
} from "../../../icons/components";

// styles
import { styles } from "./MenuSettings.styles";
import colors from "../../../../styles/colors";

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
  const { userData } = useContext(userContext);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isSos, setIsSos] = useState(false);

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
      <View>
        <View style={styles.containerHeader}>
          <View style={styles.boxHeaderEmpty} />
          <Text style={styles.titleHeader}>
            <Trans>Settings</Trans>
          </Text>
          <TouchableOpacity onPress={onCloseMenu}>
            <IconClose width={24} height={24} fill={colors.blackCoffee} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerProfile}>
          {userData?.avatar?.url ? (
            <ImageCache
              imageSrc={userData.avatar.url}
              style={styles.imageProfile}
            />
          ) : (
            <View style={styles.imageProfileEmpty}>
              <IconAvatarEmpty width={20} height={20} />
            </View>
          )}
          <Text style={styles.titleProfile}>{userData?.email}</Text>
        </View>
        <View style={styles.lineWhite} />
        <ItemMenuSettings
          title={i18n._("SOS signal notification")}
          Icon={IconBellGradient}
          onPress={() => {
            Alert.alert("SOS signal notification");
          }}
        />
        <View style={styles.lineWhite} />
        <ItemMenuSettings
          title={i18n._("Share the app")}
          Icon={IconShareGradient}
          onPress={() => {
            Alert.alert("Share the app");
          }}
        />
        <View style={styles.lineWhite} />
        <ItemMenuSettings
          title={i18n._("About the service")}
          Icon={IconWheelGradient}
          onPress={() => {
            Alert.alert("About the service");
          }}
        />
        <View style={styles.lineWhite} />
        <ItemMenuSettings
          title={i18n._("Terms of use")}
          Icon={IconDocumentGradient}
          onPress={() => {
            Alert.alert("Terms of use");
          }}
        />
        <View style={styles.lineWhite} />
        <ItemMenuSettings
          title={i18n._("Privacy policy")}
          Icon={IconLockGradient}
          onPress={() => {
            Alert.alert("Privacy policy");
          }}
        />
        <View style={styles.lineWhite} />
        <View style={styles.containerCheckboxes}>
          <Text style={styles.titleDarkTheme}>
            <Trans>Dark theme</Trans>
          </Text>
          <Checkbox check={darkTheme} setCheck={setDarkTheme} />
        </View>
        <View style={styles.containerLanguage}>
          <ChangeLanguage />
        </View>
      </View>
      <View style={styles.containerCheckboxes}>
        <Text style={styles.titleSos}>
          <Trans>SOS signal</Trans>
        </Text>
        <Checkbox
          check={isSos}
          setCheck={setIsSos}
          colorBoxEnabled={colors.electricRed}
        />
      </View>
    </View>
  );
};
