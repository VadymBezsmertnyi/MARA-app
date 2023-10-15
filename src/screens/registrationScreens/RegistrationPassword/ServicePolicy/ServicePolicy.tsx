import React, { FunctionComponent, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Trans } from '@lingui/macro';

// helps
import { useRegistrationNavigation } from '../../../../navigators/Navigators.helps';

// constants
import { PATHS_REGISTRATION_SCREENS } from '../../../../navigators/useNavigator.constants';

// styles
import { styles } from './ServicePolicy.styles';

export const ServicePolicy: FunctionComponent = () => {
  const navigation = useRegistrationNavigation();
  const toTermsOfService = () => {
    navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationTermsOfUse);
  };

  const toPrivacyPolicy = () => {
    navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationPrivacyPolicy);
  };

  const styleTextLink = useMemo(() => [styles.text, styles.link], []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Trans>By clicking the "Continue" button, you agree to the</Trans>{' '}
      </Text>
      <TouchableOpacity onPress={toTermsOfService}>
        <Text style={styleTextLink}>
          <Trans>Terms of Service</Trans>{' '}
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>and </Text>
      <TouchableOpacity onPress={toPrivacyPolicy}>
        <Text style={styleTextLink}>
          <Trans>Privacy Policy</Trans>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
