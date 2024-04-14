import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Share,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
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
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";

// components
import { ItemMenuSettings } from "./components/ItemMenuSettings/ItemMenuSettings";
import { ImageCache } from "../../../components/ImageCache/ImageCache";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { ChangeLanguage } from "../../../components/ChangeLanguage/ChangeLanguage";
import { ModalSelectPlatform } from "./components/ModalSelectPlatform/ModalSelectPlatform";
import { ModalSosOn } from "./components/ModalSosOn/ModalSosOn";
import { ModalSettingsSos } from "./components/ModalSettingsSos/ModalSettingsSos";
import { ModalAgreements } from "./components/ModalAgreements/ModalAgreements";

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

const PACKAGE_NAME = "com.motoauto.mara";
const APP_NAME = "moto.auto.road.assistant";
const APP_ID = "";

type MenuSettingsProps = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

export const MenuSettings: FunctionComponent<MenuSettingsProps> = ({
  navigation,
  state,
}) => {
  const { i18n } = useContext(localesContext);
  const { heightStatusBar } = useContext(themeContext);
  const { usersSos, onDeleteSos } = useContext(mapContext);
  const { userData, editUser } = useContext(userContext);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isSos, setIsSos] = useState(false);
  const [isShowSelectPlatform, setIsShowSelectPlatform] = useState(false);
  const [isShowOnSos, setIsShowOnSos] = useState(false);
  const [isShowSettingsSos, setIsShowSettingsSos] = useState(false);
  const [typeAgreements, setTypeAgreements] = useState<
    "terms" | "policy" | null
  >(null);
  const isOnSos = useMemo(
    () =>
      usersSos
        ? usersSos.filter((userSos) => userSos.userId === userData?.id).length >
          0
        : false,
    [usersSos]
  );
  const isShowDrawer = useMemo(
    () =>
      state.history.length
        ? state.history[state.history.length - 1].type === "drawer"
        : false,
    [state.history]
  );
  // TODO will do
  const isToggleTheme = false;

  const containerStyles = useMemo(
    () => [
      styles.container,
      {
        paddingTop: heightStatusBar,
      },
    ],
    [heightStatusBar]
  );

  const shareApp = async (selectPlatform: "ios" | "android") => {
    const currentUrl =
      selectPlatform === "ios"
        ? `https://apps.apple.com/uk/app/${APP_NAME}/id=${APP_ID}`
        : `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
    await Share.share({
      title: "M.A.R.A.(Moto Auto Road Assistant)",
      message: Platform.OS === "android" ? currentUrl : undefined,
      url: currentUrl,
    });
  };

  const onToggleLocation = async () => {
    const isGeoLocation = !(userData?.isGeoLocation || false);
    const isGeoLocationBackground = isGeoLocation
      ? userData?.isGeoLocationBackground || false
      : false;
    await editUser({
      isGeoLocation,
      isGeoLocationBackground,
    });
  };

  const onToggleLocationBackground = async () => {
    const isGeoLocationBackground = !(
      userData?.isGeoLocationBackground || false
    );
    await editUser({
      isGeoLocationBackground,
    });
  };

  const onCloseMenu = () => {
    navigation.closeDrawer();
  };

  return (
    <>
      <View style={containerStyles}>
        {isShowDrawer ? (
          <StatusBar backgroundColor={colors.lightOrange} />
        ) : null}
        <ScrollView>
          <View style={styles.containerHeader}>
            <View style={styles.boxHeaderEmpty} />
            <Text style={styles.titleHeader}>
              <Trans>Settings</Trans>
            </Text>
            <TouchableOpacity
              accessibilityLabel={i18n._(
                "Button for closing the menu settings screen"
              )}
              onPress={onCloseMenu}
              style={styles.buttonClose}
            >
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
              setIsShowSettingsSos(true);
            }}
          />
          <View style={styles.lineWhite} />
          <ItemMenuSettings
            title={i18n._("Share the app")}
            Icon={IconShareGradient}
            onPress={() => {
              setIsShowSelectPlatform(true);
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
              setTypeAgreements("terms");
            }}
          />
          <View style={styles.lineWhite} />
          <ItemMenuSettings
            title={i18n._("Privacy policy")}
            Icon={IconLockGradient}
            onPress={() => {
              setTypeAgreements("policy");
            }}
          />
          <View style={styles.lineWhite} />
          <View style={styles.containerCheckboxes}>
            {isToggleTheme ? (
              <View style={styles.containerCheckbox}>
                <Text style={styles.titleDarkTheme}>
                  <Trans>Dark theme</Trans>
                </Text>
                <Checkbox check={darkTheme} setCheck={setDarkTheme} />
              </View>
            ) : null}
            <TouchableOpacity
              onPress={onToggleLocation}
              style={styles.containerCheckbox}
            >
              <Text numberOfLines={2} style={styles.titleDarkTheme}>
                <Trans>Automatically detect location</Trans>
              </Text>
              <Checkbox
                accessibilityLabel={i18n._(
                  "Toggle automatically detect location"
                )}
                check={userData?.isGeoLocation || false}
                setCheck={onToggleLocation}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onToggleLocation}
              style={[
                styles.containerCheckbox,
                { opacity: userData?.isGeoLocation ? 1 : 0.5 },
              ]}
            >
              <Text numberOfLines={2} style={styles.titleDarkTheme}>
                <Trans>Automatically detect location in the background</Trans>
              </Text>
              <Checkbox
                accessibilityLabel={i18n._(
                  "Toggle automatically detect location in the background"
                )}
                check={userData?.isGeoLocationBackground || false}
                setCheck={onToggleLocationBackground}
              />
            </TouchableOpacity>
            <View style={styles.containerCheckbox}>
              <Text style={styles.titleSos}>
                <Trans>SOS signal</Trans>
              </Text>
              <Checkbox
                check={isOnSos || isSos}
                setCheck={(value) => {
                  if (value) setIsShowOnSos(true);
                  else onDeleteSos();
                  setIsSos(value);
                }}
                colorBoxEnabled={colors.electricRed}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.containerLanguage}>
          <ChangeLanguage />
        </View>
      </View>
      <ModalSelectPlatform
        isOpen={isShowSelectPlatform}
        onClose={() => {
          setIsShowSelectPlatform(false);
        }}
        onSelect={shareApp}
      />
      <ModalSosOn
        isOpen={isShowOnSos}
        onClose={() => {
          setIsShowOnSos(false);
          setIsSos(false);
        }}
      />
      <ModalSettingsSos
        isOpen={isShowSettingsSos}
        onClose={() => {
          setIsShowSettingsSos(false);
        }}
      />
      <ModalAgreements
        isOpen={typeAgreements !== null}
        onClose={() => {
          setTypeAgreements(null);
        }}
        type={typeAgreements}
      />
    </>
  );
};
