import React, { FunctionComponent, useContext, useMemo } from "react";
import {
  ImageURISource,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Trans } from "@lingui/macro";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { CommonActions } from "@react-navigation/native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ItemMyList } from "./components/ItemMyList/ItemMyList";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";

// icons
import { IconProfileAvatar } from "../../../icons/components";

// styles
import { styles } from "./SettingsMain.styles";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";
import colors from "../../../../styles/colors";

type SettingsMainProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationHelpers;
};

export const SettingsMain: FunctionComponent<SettingsMainProps> = ({
  navigation,
}) => {
  const { userData, exitUser } = useContext(userContext);
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const imageSource = useMemo(
    () =>
      userData?.avatar
        ? ({
            uri: userData.avatar.url,
            cache: "force-cache",
          } as ImageURISource)
        : null,
    [userData?.avatar]
  );

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const onLogoutProfile = async () => {
    const isSignedInGoogle = await GoogleSignin.isSignedIn();
    const isSignedInFacebook = await AccessToken.getCurrentAccessToken();
    if (isSignedInGoogle) await GoogleSignin.signOut();
    if (isSignedInFacebook) LoginManager.logOut();
    await exitUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: PATHS_MAIN_SCREENS.welcome }],
      })
    );
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.buttonsHeaderLeft}>
          <MenuBurgerButton onPress={onShowMenu} />
        </View>
        <Text style={styles.titleHeader}>
          <Trans>Your profile</Trans>
        </Text>
        <TouchableOpacity
          onPress={onLogoutProfile}
          style={styles.buttonsHeaderRight}
        >
          <Text style={styles.titleLogout}>
            <Trans>Logout</Trans>
          </Text>
        </TouchableOpacity>
      </View>
      <ContainerUser />
      <View style={styles.containerLineEmpty} />
      <ScrollView>
        <View style={styles.containerList}>
          <View style={styles.lineEmptyFirst} />
          <ItemMyList
            title={i18n._("My adverts")}
            titleButton={i18n._("Add advert")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProducts);
            }}
            onAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProductAdd);
            }}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My workshops")}
            titleButton={i18n._("Add workshop")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
            }}
            onAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopAdd);
            }}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My events")}
            titleButton={i18n._("Add event")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
            }}
            onAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventAdd);
            }}
          />
        </View>
        <View style={styles.lineEmpty} />
        <View style={styles.containerFooter}>
          <ButtonCustom
            type="transparent"
            title={i18n._("Setting profile")}
            onSubmit={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProfile);
            }}
          />
        </View>
        <View style={styles.containerEmpty} />
      </ScrollView>
    </View>
  );
};
