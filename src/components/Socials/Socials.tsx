import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Platform, Text, View, ViewStyle } from "react-native";
import { Trans } from "@lingui/macro";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

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
import colors from "../../../styles/colors";

type SocialsProps = {
  isTitle?: boolean;
  styleContainer?: ViewStyle;
  onChangeGoogle: (value: User) => void;
  onChangeFacebook: (accessToken: string) => void;
};

export const Socials: FunctionComponent<SocialsProps> = ({
  isTitle = false,
  styleContainer,
  onChangeGoogle,
  onChangeFacebook,
}) => {
  const [focus, setFocus] = useState<number | null>(null);
  const { theme } = useContext(themeContext);

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
  const labelSocialConnectStyle = useCallback(
    (isFocus: boolean) => [
      styles.labelSocialConnect,
      theme === THEME_DARK && styles.colorWhite,
      isFocus && { color: colors.white },
    ],
    [theme, focus]
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
        {isIos ? (
          <ButtonCustom
            type="transparent"
            onSubmit={onFacebook}
            onPressFocus={(value) => {
              if (value) setFocus(1);
              else setFocus(null);
            }}
          >
            <View style={styles.itemSocialConnect}>
              <SocialFacebook width={24} height={24} />
              <Text style={labelSocialConnectStyle(focus === 1)}>
                {showTitle("Facebook")}
              </Text>
            </View>
          </ButtonCustom>
        ) : null}
        {isIos ? (
          <ButtonCustom
            type="transparent"
            onSubmit={onApple}
            onPressFocus={(value) => {
              if (value) setFocus(2);
              else setFocus(null);
            }}
          >
            <View style={styles.itemSocialConnect}>
              <SocialApple width={24} height={24} />
              <Text style={labelSocialConnectStyle(focus === 2)}>
                {showTitle("Apple")}
              </Text>
            </View>
          </ButtonCustom>
        ) : null}
        <ButtonCustom
          type="transparent"
          onSubmit={onGoogle}
          onPressFocus={(value) => {
            if (value) setFocus(3);
            else setFocus(null);
          }}
        >
          <View style={styles.itemSocialConnect}>
            <SocialGoogle width={24} height={24} />
            <Text style={labelSocialConnectStyle(focus === 3)}>
              {showTitle("Google")}
            </Text>
          </View>
        </ButtonCustom>
      </View>
    </View>
  );
};
