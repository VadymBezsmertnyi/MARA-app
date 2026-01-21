import React, { FunctionComponent, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

// types
import { RootAllScreensParamList } from "../../../navigators/Navigators.types";

// providers
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useSubscriptionProvider } from "../../../providers/SubscriptionProvider/SubscriptionProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";
import { MenuBurgerButton } from "../../../components/MenuBurgerButton/MenuBurgerButton";
import ItemTypeSetting from "./components/ItemTypeSetting/ItemTypeSetting";
import { ContainerUser } from "./components/ContainerUser/ContainerUser";
import ModalWindowBuy from "../../../components/ModalWindowBuy/ModalWindowBuy";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_SETTINGS_SCREENS,
} from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./SettingsMain.styles";

type SettingsMainProps = {
  navigation: NativeStackNavigationProp<RootAllScreensParamList> &
    DrawerNavigationProp<RootAllScreensParamList>;
};

export const SettingsMain: FunctionComponent<SettingsMainProps> = ({
  navigation,
}) => {
  const { exitUser } = useUserProvider();
  const { infoSmallEvents, infoWorkshops } = useSubscriptionProvider();
  const { i18n } = useLocalesProvider();
  const { heightStatusBar } = useThemeProvider();
  const [isShowPayment, setIsShowPayment] = useState(false);

  const containerStyles = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }],
    [heightStatusBar]
  );

  const onShowMenu = () => {
    navigation.openDrawer();
  };

  const onLogoutProfile = async () => {
    const isSignedInGoogle = GoogleSignin.hasPreviousSignIn();
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

  const onPressBuy = () => {
    setIsShowPayment(true);
  };

  return (
    <>
      <View style={containerStyles}>
        <View style={styles.containerHeader}>
          <View style={styles.buttonsHeaderLeft}>
            <MenuBurgerButton onPress={onShowMenu} />
          </View>
          <Text style={styles.titleHeader}>{i18n._("Your profile")}</Text>
          <TouchableOpacity
            onPress={onLogoutProfile}
            style={styles.buttonsHeaderRight}
          >
            <Text style={styles.titleLogout}>{i18n._("Logout")}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <ContainerUser />
          <View style={styles.containerList}>
            <View style={styles.containerLineEmpty} />
            <ItemTypeSetting
              title={i18n._("Your workshops")}
              amountUsed={infoWorkshops.useAmountWorkshop}
              amountAvailable={infoWorkshops.amountWorkshop}
              amountAvailableTitle={`${infoWorkshops.amountWorkshop}`}
              onPressView={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshops);
              }}
              onPressAdd={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsWorkshopAdd);
              }}
              onPressBuy={onPressBuy}
            />
            <View style={styles.containerLineEmpty} />
            <ItemTypeSetting
              title={i18n._("Your events")}
              amountUsed={infoSmallEvents.useAmountSmallEvent}
              amountAvailable={infoSmallEvents.amountSmallEvent}
              amountAvailableTitle={`${infoSmallEvents.amountSmallEvent}`}
              onPressView={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEvents);
              }}
              onPressAdd={() => {
                navigation.navigate(PATHS_SETTINGS_SCREENS.settingsEventAdd);
              }}
              onPressBuy={onPressBuy}
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
      {isShowPayment && (
        <ModalWindowBuy onClose={() => setIsShowPayment(false)} />
      )}
    </>
  );
};
