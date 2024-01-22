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

// providers
import { userContext } from "../../../providers/user/user.provider";
import { localesContext } from "../../../../localization/localization.provider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ItemMyList } from "./components/ItemMyList/ItemMyList";

// helps
import { useMainTabsNavigation } from "../../../navigators/Navigators.helps";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";

// icons
import { IconProfileAvatar } from "../../../icons/components";

// styles
import { styles } from "./SettingsMain.styles";

export const SettingsMain: FunctionComponent = () => {
  const navigation = useMainTabsNavigation();
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
    navigation.navigate(PATHS_MAIN_SCREENS.welcome);
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerHeader}>
        <View style={styles.buttonsHeaderLeft}>
          <MenuBurgerButton onPress={onShowMenu} />
        </View>
        <Text style={styles.titleHeader}>
          <Trans>Profile</Trans>
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
      <View style={styles.containerAvatar}>
        <View style={styles.containerImage}>
          {imageSource ? (
            <ImageCache style={styles.containerImage} imageSrc={imageSource} />
          ) : (
            <IconProfileAvatar />
          )}
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.infoUser}>{userData?.firstName}</Text>
          <Text style={styles.infoUser}>{userData?.email}</Text>
          <Text style={styles.infoUser}>
            {userData?.cityUser?.formatted_address}
          </Text>
          <Text style={styles.infoUser}>{userData?.phoneNumber}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.containerList}>
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My ads")}
            titleButton={i18n._("Add ad")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsAds);
            }}
            onAdd={() => {}}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My workshops")}
            titleButton={i18n._("Add workshop")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
            }}
            onAdd={() => {}}
          />
          <View style={styles.lineEmpty} />
          <ItemMyList
            title={i18n._("My events")}
            titleButton={i18n._("Add event")}
            onLinkTo={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
            }}
            onAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsAddEvent);
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
      </ScrollView>
    </View>
  );
};
