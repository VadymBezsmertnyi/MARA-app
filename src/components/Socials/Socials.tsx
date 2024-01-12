import React, { FunctionComponent, useContext, useMemo } from "react";
import { Alert, Platform, Text, View, ViewStyle } from "react-native";
import { Trans } from "@lingui/macro";

// providers
import { themeContext } from "../../providers/theme/theme.provider";
import { localesContext } from "../../../localization/localization.provider";

// components
import {
  SocialFacebook,
  SocialGoogle,
  SocialApple,
} from "../../icons/components";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

// constants
import { THEME_DARK } from "../../providers/theme/theme.const";

// styles
import { styles } from "./Socials.styles";

type SocialsProps = {
  isTitle?: boolean;
  styleContainer?: ViewStyle;
};

export const Socials: FunctionComponent<SocialsProps> = ({
  isTitle = false,
  styleContainer,
}) => {
  const { i18n } = useContext(localesContext);
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
  const labelSocialConnectStyle = useMemo(
    () => [
      styles.labelSocialConnect,
      theme === THEME_DARK && styles.colorWhite,
    ],
    [theme]
  );

  const onFacebook = () => {
    Alert.alert("You select: Facebook");
  };

  const onGoogle = () => {
    Alert.alert("You select: Google");
  };

  const onApple = () => {
    Alert.alert("You select: Apple");
  };

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
            <Text style={labelSocialConnectStyle}>
              {i18n._(`Continue with {typeSocial}`, { typeSocial: "Facebook" })}
            </Text>
          </View>
        </ButtonCustom>
        {isIos ? (
          <ButtonCustom type="transparent" onSubmit={onApple}>
            <View style={styles.itemSocialConnect}>
              <SocialApple width={24} height={24} />
              <Text style={labelSocialConnectStyle}>
                {i18n._(`Continue with {typeSocial}`, { typeSocial: "Apple" })}
              </Text>
            </View>
          </ButtonCustom>
        ) : (
          <ButtonCustom type="transparent" onSubmit={onGoogle}>
            <View style={styles.itemSocialConnect}>
              <SocialGoogle width={24} height={24} />
              <Text style={labelSocialConnectStyle}>
                {i18n._(`Continue with {typeSocial}`, { typeSocial: "Google" })}
              </Text>
            </View>
          </ButtonCustom>
        )}
      </View>
    </View>
  );
};
