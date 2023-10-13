import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans, t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../localization/localization.provider';
import { themeContext } from '../../../providers/theme/theme.provider';

// components
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';
import { InputPhone } from '../../../components/InputPhone/InputPhone';

// constants
import { THEME_DARK } from '../../../providers/theme/theme.const';
import { DEFAULT_CODE_COUNTRY, DEFAULT_COUNTRY } from '../../../constants/inputs.const';

// helps
import { useAllNavigation } from '../../../navigators/Navigators.helps';

// styles
import { styles } from './RegistrationPhone.styles';

export const RegistrationPhone: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isVerify, setIsVerify] = useState(false);

  const onSubmit = () => {
    if (isVerify) navigation.navigate('registrationCode', { phoneNumber });
  };

  const titleStyle = useMemo(
    () => [styles.title, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerBody}>
        <Text style={titleStyle}>
          <Trans>To start, I suggest registering</Trans>
        </Text>
        <InputPhone
          label={t(i18n)`Please enter your phone number`}
          phoneNumber={phoneNumber || `+${DEFAULT_CODE_COUNTRY}`}
          setPhoneNumber={setPhoneNumber}
          selectCountryIso={selectCountryIso}
          setSelectCountryIso={setSelectCountryIso}
          setIsVerify={setIsVerify}
        />
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom disabled={!isVerify} title={t(i18n)`Continue`} onSubmit={onSubmit} />
      </View>
    </ScrollView>
  );
};
