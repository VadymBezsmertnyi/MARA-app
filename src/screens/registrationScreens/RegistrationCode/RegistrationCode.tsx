import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { t } from '@lingui/macro';

// components
import { InputCode } from '../../../components/InputCode/InputCode';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// providers
import { localesContext } from '../../../../localization/localization.provider';

// helps
import { useAllNavigation, useMainRoute } from '../../../navigators/Navigators.helps';

// styles
import { styles } from './RegistrationCode.styles';

const DEFAULT_CELL_COUNT = 4;
const AMOUNT_MILLISECONDS_TIMEOUT = 5000;

export const RegistrationCode: FunctionComponent = () => {
  const route = useMainRoute('registrationCode');
  const navigation = useAllNavigation();
  const { phoneNumber } = route.params;
  const { i18n } = useContext(localesContext);
  const [code, setCode] = useState('');
  const [isRecentCode, setIsRecentCode] = useState(false);

  const onSubmit = () => {
    if (code.length === DEFAULT_CELL_COUNT) {
      if (isRecentCode) navigation.navigate('registrationPassword');
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};
