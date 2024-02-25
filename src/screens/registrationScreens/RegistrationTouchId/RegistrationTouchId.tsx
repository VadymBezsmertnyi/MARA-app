import React, { FunctionComponent, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Trans, t } from "@lingui/macro";

// providers
import { biometricAuthenticatorContext } from "../../../providers/BiometricProvider/BiometricProvider";
import { localesContext } from "../../../../localization/localization.provider";
import { userContext } from "../../../providers/UserProvider/UserProvider";

// components
import { ButtonCustom } from "../../../components/ButtonCustom/ButtonCustom";

// hooks
import { useAllNavigation } from "../../../navigators/Navigators.helps";

// constants
import {
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from "../../../navigators/useNavigator.constants";

// icons
import { IconClose, IconTouchIdGradient } from "../../../icons/components";

// styles
import { styles } from "./RegistrationTouchId.styles";
import colors from "../../../../styles/colors";

export const RegistrationTouchId: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { userData, editUser } = useContext(userContext);
  const { i18n } = useContext(localesContext);
  const { checkBiometric } = useContext(biometricAuthenticatorContext);
  const nameApp = "MARA";

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
    <View style={styles.container}>
      <View style={styles.containerClose}>
        <TouchableOpacity
          accessibilityLabel={i18n._(
            "Button for closing the registration TouchID"
          )}
          onPress={onAllowLater}
        >
          <IconClose width={24} height={24} fill={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitles}>
        <Text numberOfLines={2} style={styles.title}>
          <Trans>Allow login using Touch ID</Trans>
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          <Trans>Allow Touch ID to access the {nameApp} app.</Trans>
        </Text>
      </View>
      <View style={styles.containerIcon}>
        <IconTouchIdGradient width={110} height={110} />
        <Text style={styles.titleIcon}>Touch ID</Text>
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
