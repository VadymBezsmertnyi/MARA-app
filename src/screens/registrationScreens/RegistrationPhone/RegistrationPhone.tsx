import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans, t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../localization/localization.provider';
import { themeContext } from '../../../providers/theme/theme.provider';
import { userContext } from '../../../providers/user/user.provider';

// components
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';
import { InputPhone } from '../../../components/InputPhone/InputPhone';

// constants
import { THEME_DARK } from '../../../providers/theme/theme.const';
import { DEFAULT_CODE_COUNTRY, DEFAULT_COUNTRY } from '../../../constants/inputs.const';
import {
  PATHS_MAIN_SCREENS,
  PATHS_REGISTRATION_SCREENS,
} from '../../../navigators/useNavigator.constants';

// helps
import { useAllNavigation } from '../../../navigators/Navigators.helps';

// styles
import { styles } from './RegistrationPhone.styles';

export const RegistrationPhone: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const { sendCodeToUser } = useContext(userContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);
  const [isVerify, setIsVerify] = useState(false);
  const [errorMessage, setErrorsMessage] = useState('');

  const onSubmit = async () => {
    if (isVerify && phoneNumber.length) {
      const { result, isHaveUser } = await sendCodeToUser(phoneNumber);
      if (result) navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationCode, { phoneNumber });
      else if (isHaveUser) navigation.navigate(PATHS_MAIN_SCREENS.authorization, { phoneNumber });
      else setErrorsMessage(t(i18n)`You have entered the phone number incorrectly`);
    } else setErrorsMessage(t(i18n)`You have entered the phone number incorrectly`);
  };

  const titleStyle = useMemo(
    () => [styles.title, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );

  const onChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
    setErrorsMessage('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerBody}>
        <Text style={titleStyle}>
          <Trans>To start, I suggest registering</Trans>
        </Text>
        <InputPhone
          label={t(i18n)`Please enter your phone number`}
          phoneNumber={phoneNumber || `+${DEFAULT_CODE_COUNTRY}`}
          setPhoneNumber={onChangePhoneNumber}
          selectCountryIso={selectCountryIso}
          setSelectCountryIso={setSelectCountryIso}
          setIsVerify={setIsVerify}
          errorMessage={errorMessage}
        />
      </View>
      <View style={styles.containerButtons}>
        <ButtonCustom disabled={!isVerify} title={t(i18n)`Continue`} onSubmit={onSubmit} />
      </View>
    </ScrollView>
  );
};
