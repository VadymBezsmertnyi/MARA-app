import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans, t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../localization/localization.provider';
import { themeContext } from '../../../providers/theme/theme.provider';

// components
import { InputPhone } from '../../../components/InputPhone/InputPhone';

// components
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// constants
import { DEFAULT_CODE_COUNTRY, DEFAULT_COUNTRY } from '../../../constants/inputs.const';
import { THEME_DARK } from '../../../providers/theme/theme.const';
import { PATHS_FORGET_SCREENS } from '../../../navigators/useNavigator.constants';

// helps
import { useAuthorizationRegistration } from '../../../helps/useAuthorizationRegistration';
import { useForgetNavigation } from '../../../navigators/Navigators.helps';

// styles
import { styles } from './ForgetPhone.styles';

export const ForgetPhone: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const navigation = useForgetNavigation();
  const { i18n } = useContext(localesContext);
  const [phone, setPhone] = useState('');
  const { verifyPhone } = useAuthorizationRegistration();
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);

  const titleStyle = useMemo(
    () => [styles.title, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );
  const subTitleStyle = useMemo(
    () => [styles.subTitle, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );
  const errorsMessagePhone = verifyPhone(phone, selectCountryIso);
  const isError = Boolean(errorsMessagePhone.length);

  const onSubmit = () => {
    if (!isError)
      navigation.navigate(PATHS_FORGET_SCREENS.forgetCode, {
        phoneNumber: phone,
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.containerTitles}>
          <Text style={titleStyle}>
            <Trans>Forgot your password?</Trans>
          </Text>
          <Text style={subTitleStyle}>
            <Trans>We will help you recover it.</Trans>
          </Text>
        </View>
        <View style={styles.containerInput}>
          <InputPhone
            phoneNumber={phone || `+${DEFAULT_CODE_COUNTRY}`}
            setPhoneNumber={setPhone}
            selectCountryIso={selectCountryIso}
            setSelectCountryIso={setSelectCountryIso}
            label={t(i18n)`Please enter your phone number`}
          />
        </View>
      </View>
      <View>
        <ButtonCustom disabled={isError} title={t(i18n)`Continue`} onSubmit={onSubmit} />
      </View>
    </ScrollView>
  );
};
