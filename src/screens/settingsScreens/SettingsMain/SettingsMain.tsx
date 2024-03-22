import React, { FunctionComponent, useContext, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import { ItemMyList } from "./components/ItemMyList/ItemMyList";
import { ContainerBusiness } from "./components/ContainerBusiness/ContainerBusiness";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./SettingsMain.styles";

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

  const onCreateBusiness = () => {
    navigation.navigate(PATHS_SETTINGS_SCREENS.settingsBusinessCreate);
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
      <ScrollView>
        <ContainerUser />
        <View style={styles.containerLineEmpty} />
        <ContainerBusiness onCreateBusiness={onCreateBusiness} />
        <View style={styles.containerList}>
          <View style={styles.containerLineEmpty} />
          <ItemMyList
            title={i18n._("Your adverts")}
            amountUsed={userData?.productsIds.length || 0}
            amountAvailable={0}
            onPressView={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProducts);
            }}
            onPressAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsProductAdd);
            }}
          />
          <View style={styles.containerLineEmpty} />
          <ItemMyList
            title={i18n._("Your workshops")}
            amountUsed={userData?.workshopsIds.length || 0}
            amountAvailable={0}
            onPressView={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
            }}
            onPressAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopAdd);
            }}
          />
          <View style={styles.containerLineEmpty} />
          <ItemMyList
            title={i18n._("Your events")}
            amountUsed={userData?.eventsIds.length || 0}
            amountAvailable={0}
            onPressView={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
            }}
            onPressAdd={() => {
              navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventAdd);
            }}
          />
        </View>
        <View style={styles.containerLineEmpty} />
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
