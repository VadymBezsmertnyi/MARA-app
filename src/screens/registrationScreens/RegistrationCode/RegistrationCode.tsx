import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { t } from '@lingui/macro';

// components
import { InputCode } from '../../../components/InputCode/InputCode';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// providers
import { localesContext } from '../../../../localization/localization.provider';
import { userContext } from '../../../providers/user/user.provider';

// helps
import { useAllNavigation, useMainRoute } from '../../../navigators/Navigators.helps';

// constants
import { PATHS_REGISTRATION_SCREENS } from '../../../navigators/useNavigator.constants';

// styles
import { styles } from './RegistrationCode.styles';

const DEFAULT_CELL_COUNT = 4;
const AMOUNT_MILLISECONDS_TIMEOUT = 5000;

export const RegistrationCode: FunctionComponent = () => {
  const route = useMainRoute(PATHS_REGISTRATION_SCREENS.registrationCode);
  const navigation = useAllNavigation();
  const { sendCodeToUser, sendVerifyCode } = useContext(userContext);
  const { phoneNumber } = route.params;
  const { i18n } = useContext(localesContext);
  const [code, setCode] = useState('');
  const [isRecentCode, setIsRecentCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    if (code.length === DEFAULT_CELL_COUNT) {
      const isVerifyCode = await sendVerifyCode(code);
      if (isVerifyCode) {
        navigation.navigate(PATHS_REGISTRATION_SCREENS.registrationPassword);
      } else setErrorMessage(t(i18n)`You have entered the confirmation code incorrectly`);
    }
  };

  const onResendCode = async () => {
    await sendCodeToUser(phoneNumber);
  };

  const timeoutRecentCode = () => {
    const timeout = setTimeout(() => {
      setIsRecentCode(true);
    }, AMOUNT_MILLISECONDS_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  };

  const onChangeCode = (value: string) => {
    setCode(value);
    setErrorMessage('');
  };

  useEffect(() => {
    if (!isRecentCode) timeoutRecentCode();
  }, [isRecentCode]);

  return (
    <SafeAreaView style={styles.container}>
      <InputCode
        value={code}
        setValue={onChangeCode}
        title={t(i18n)`You have been sent an SMS with a code.`}
        subTitle={t(
          i18n,
        )`We have sent you an SMS with a code to the number ${phoneNumber}. If you didn't receive the message, press the button below to resend.`}
        isResendCode={isRecentCode}
        onResendCode={onResendCode}
        cellCount={DEFAULT_CELL_COUNT}
        errorMessage={errorMessage}
      />
      <ButtonCustom
        disabled={code.length < DEFAULT_CELL_COUNT}
        title={t(i18n)`Continue`}
        onSubmit={onSubmit}
        styleContainer={styles.buttonSubmit}
      />
    </SafeAreaView>
  );
};
