import React, { FunctionComponent, useMemo } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Trans, t } from "@lingui/macro";

// providers
import { useBiometricProvider } from "../../../providers/BiometricProvider/BiometricProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";

// hooks
import { useAllNavigation } from "../../../navigators/Navigators.helps";

// icons
import { IconClose, IconFaceIdGradient } from "../../../icons/components";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from "../../../navigators/useNavigator.constants";

// styles
import { styles } from "./RegistrationFaceId.styles";
import colors from "../../../../styles/colors";

export const RegistrationFaceId: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { i18n } = useLocalesProvider();
  const { userData, editUser } = useUserProvider();
  const { checkBiometric } = useBiometricProvider();
  const { heightStatusBar } = useThemeProvider();
  const nameApp = "MARA";
  const containerStyles: ViewStyle = useMemo(
    () => [styles.container, { paddingTop: heightStatusBar }] as ViewStyle,
    [heightStatusBar]
  );

  const redirect = () => {
    if (userData?.isNewUser)
      navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationLocation);
    else navigation.navigate(PATHS_MAIN_SCREENS.main);
  };

  const onAllowLater = async () => {
    await editUser({ isCheckBiometric: false });
    redirect();
  };

  const onAllow = async () => {
    await checkBiometric();
    await editUser({ isCheckBiometric: true });
    redirect();
  };

  return (
    <View style={containerStyles}>
      <View style={styles.containerClose}>
        <TouchableOpacity
          accessibilityLabel={i18n._(
            "Button for closing the registration FaceID"
          )}
          onPress={onAllowLater}
        >
          <IconClose width={24} height={24} fill={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitles}>
        <Text numberOfLines={2} style={styles.title}>
          <Trans>Allow login using Face ID</Trans>
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          <Trans>Enable logging into the app using Face ID</Trans>
        </Text>
      </View>
      <View style={styles.containerIcon}>
        <IconFaceIdGradient width={110} height={110} />
        <Text style={styles.titleIcon}>Face ID</Text>
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom title={t(i18n)`Allow`} onSubmit={onAllow} />
        <ButtonCustom
          title={t(i18n)`Allow later`}
          onSubmit={onAllowLater}
          type="transparent"
        />
      </View>
    </View>
  );
};
