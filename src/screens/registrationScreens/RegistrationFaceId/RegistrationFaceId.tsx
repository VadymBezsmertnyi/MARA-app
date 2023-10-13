import React, { FunctionComponent, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Trans, t } from '@lingui/macro';

// providers
import { biometricAuthenticatorContext } from '../../../providers/biometricAuthenticator/biometricAuthenticator.provider';
import { localesContext } from '../../../../localization/localization.provider';

// components
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// hooks
import { useAllNavigation } from '../../../navigators/Navigators.helps';

// icons
import { IconClose, IconFaceIdGradient } from '../../../icons/components';

// styles
import { styles } from './RegistrationFaceId.styles';
import colors from '../../../../styles/colors';

export const RegistrationFaceId: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { i18n } = useContext(localesContext);
  const { checkBiometric } = useContext(biometricAuthenticatorContext);
  const nameApp = 'MARA';

  const onAllowLater = () => {
    navigation.navigate('main');
  };

  const onAllow = async () => {
    await checkBiometric();
    onAllowLater();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerClose}>
        <TouchableOpacity onPress={onAllowLater}>
          <IconClose width={24} height={24} fill={colors.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitles}>
        <Text numberOfLines={2} style={styles.title}>
          <Trans>Allow login using Face ID</Trans>
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          <Trans>Allow Face ID to access the {nameApp} app.</Trans>
        </Text>
      </View>
      <View style={styles.containerIcon}>
        <IconFaceIdGradient width={110} height={110} />
        <Text style={styles.titleIcon}>Face ID</Text>
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom title={t(i18n)`Allow`} onSubmit={onAllow} />
        <ButtonCustom title={t(i18n)`Allow later`} onSubmit={onAllowLater} type="transparent" />
      </View>
    </View>
  );
};
