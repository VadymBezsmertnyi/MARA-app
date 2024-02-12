import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Platform, Text, View, ViewStyle } from "react-native";
import { Trans } from "@lingui/macro";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { AccessToken, LoginManager, Settings } from "react-native-fbsdk-next";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// components
import {
  SocialFacebook,
  SocialGoogle,
  SocialApple,
} from "../../icons/components";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// constants
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";

// styles
import { styles } from "./Socials.styles";

type SocialsProps = {
  isTitle?: boolean;
  styleContainer?: ViewStyle;
  onChangeGoogle: (value: User) => void;
  onChangeFacebook: (accessToken: string) => void;
};

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const { EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS, EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB } =
  process.env as Record<string, string>;

if (EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB)
  GoogleSignin.configure({
    scopes: GOOGLE_SCOPES,
    webClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB,
    offlineAccess: true,
    iosClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS,
  });

export const Socials: FunctionComponent<SocialsProps> = ({
  isTitle = false,
  styleContainer,
  onChangeGoogle,
  onChangeFacebook,
}) => {
  const { theme } = useContext(themeContext);
  Settings.initializeSDK();

  const isIos = useMemo(() => Platform.OS === "ios", [Platform.OS]);
  const containerStyles = useMemo(
    () => [styles.socialConnect, styleContainer],
    [styleContainer]
  );
  const titleSocialConnectStyle = useMemo(
    () => [
      styles.titleSocialConnect,
      theme === THEME_DARK && styles.colorWhite,
    ],
    [theme]
  );
  const labelSocialConnectStyle = useMemo(
    () => [
      styles.labelSocialConnect,
      theme === THEME_DARK && styles.colorWhite,
    ],
    [theme]
  );

  const onFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "email",
        "public_profile",
      ]);
      if (!result.isCancelled) {
        const accessToken = await AccessToken.getCurrentAccessToken();
        if (accessToken?.accessToken) onChangeFacebook(accessToken.accessToken);
      }
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const onGoogle = async () => {
    try {
      const userDataGoogle = await GoogleSignin.signIn();
      onChangeGoogle(userDataGoogle);
    } catch (error) {}
  };

  const onApple = async () => {
    try {
      const result = await AppleAuthentication.signInAsync();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const showTitle = useCallback(
    (typeSocial: string) => <Trans>Continue with {typeSocial}</Trans>,
    []
  );

  return (
    <View style={containerStyles}>
      {isTitle ? (
        <Text style={titleSocialConnectStyle}>
          <Trans>or sign up using:</Trans>
        </Text>
      ) : null}
      <View style={styles.containerButtons}>
        <ButtonCustom type="transparent" onSubmit={onFacebook}>
          <View style={styles.itemSocialConnect}>
            <SocialFacebook width={24} height={24} />
            <Text style={labelSocialConnectStyle}>{showTitle("Facebook")}</Text>
          </View>
        </ButtonCustom>
        {isIos ? (
          <ButtonCustom type="transparent" onSubmit={onApple}>
            <View style={styles.itemSocialConnect}>
              <SocialApple width={24} height={24} />
              <Text style={labelSocialConnectStyle}>{showTitle("Apple")}</Text>
            </View>
          </ButtonCustom>
        ) : null}
        <ButtonCustom type="transparent" onSubmit={onGoogle}>
          <View style={styles.itemSocialConnect}>
            <SocialGoogle width={24} height={24} />
            <Text style={labelSocialConnectStyle}>{showTitle("Google")}</Text>
          </View>
        </ButtonCustom>
      </View>
    </View>
  );
};
