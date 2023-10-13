import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../localization/localization.provider';

// components
import { InputCode } from '../../../components/InputCode/InputCode';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// hooks
import { useForgetNavigation, useMainRoute } from '../../../navigators/Navigators.helps';

// styles
import { styles } from './ForgetCode.styles';

const DEFAULT_CELL_COUNT = 4;
const AMOUNT_MILLISECONDS_TIMEOUT = 5000;

export const ForgetCode: FunctionComponent = () => {
  const route = useMainRoute('registrationCode');
  const { phoneNumber } = route.params;
  const navigation = useForgetNavigation();
  const { i18n } = useContext(localesContext);
  const [code, setCode] = useState('');
  const [isRecentCode, setIsRecentCode] = useState(false);

  const onSubmit = () => {
    if (code.length === DEFAULT_CELL_COUNT) {
      if (isRecentCode) navigation.navigate('forgetPassword');
    }
  };

  const onResendCode = () => {
    console.log('onResendCode', code);
  };

  const timeoutRecentCode = () => {
    const timeout = setTimeout(() => {
      setIsRecentCode(true);
    }, AMOUNT_MILLISECONDS_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    if (phoneNumber) console.log(phoneNumber);
  }, []);

  useEffect(() => {
    if (!isRecentCode) timeoutRecentCode();
  }, [isRecentCode]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputCode
        value={code}
        setValue={setCode}
        title={t(i18n)`You have been sent an SMS with a code.`}
        subTitle={t(
          i18n,
        )`We have sent you an SMS with a code to the number ${phoneNumber}. If you didn't receive the message, press the button below to resend.`}
        isResendCode={isRecentCode}
        onResendCode={onResendCode}
        cellCount={DEFAULT_CELL_COUNT}
      />
      <ButtonCustom
        disabled={code.length < DEFAULT_CELL_COUNT}
        title={t(i18n)`Continue`}
        onSubmit={onSubmit}
        styleContainer={styles.buttonSubmit}
      />
    </ScrollView>
  );
};
