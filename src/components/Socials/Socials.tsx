import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Alert, Platform, Text, View, ViewStyle } from "react-native";
import { Trans } from "@lingui/macro";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

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

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/drive.readonly",
  "openid",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS as string;
const EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB as string;

type SocialsProps = {
  isTitle?: boolean;
  styleContainer?: ViewStyle;
  onChange: (value: User) => void;
};

export const Socials: FunctionComponent<SocialsProps> = ({
  isTitle = false,
  styleContainer,
  onChange,
}) => {
  const { theme } = useContext(themeContext);
  GoogleSignin.configure({
    scopes: GOOGLE_SCOPES,
    webClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB,
    offlineAccess: true,
    iosClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS,
  });

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

  const onFacebook = () => {
    Alert.alert("You select: Facebook");
    //onChange();
  };

  const onGoogle = async () => {
    try {
      const userDataGoogle = await GoogleSignin.signIn();
      onChange(userDataGoogle);
    } catch (error) {
      console.log("error", error);
    }
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
