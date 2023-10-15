import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans, t } from '@lingui/macro';

// providers
import { localesContext } from '../../../../localization/localization.provider';
import { themeContext } from '../../../providers/theme/theme.provider';
import { userContext } from '../../../providers/user/user.provider';

// types
import { KeysPasswordsT, PasswordsT } from '../../AuthorizationRegistration.types';

// components
import { InputPassword } from '../../../components/InputPassword/InputPassword';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';

// helps
import { useAllNavigation } from '../../../navigators/Navigators.helps';
import { useRegistration } from '../../../helps/useRegistration';

// constants
import { THEME_DARK } from '../../../providers/theme/theme.const';
import { PATHS_MAIN_SCREENS } from '../../../navigators/useNavigator.constants';

// styles
import { styles } from './ForgetPassword.styles';

export const ForgetPassword: FunctionComponent = () => {
  const navigation = useAllNavigation();
  const { i18n } = useContext(localesContext);
  const { theme } = useContext(themeContext);
  const { editUser } = useContext(userContext);
  const { defaultDataRegistration, verifyErrors } = useRegistration();
  const [dataRegistration, setDataRegistration] = useState<PasswordsT>(defaultDataRegistration);
  const [errorsMessage, setErrorsMessage] = useState<PasswordsT>(defaultDataRegistration);
  const errorsMessages = verifyErrors(dataRegistration);
  const isError: boolean =
    Object.values(errorsMessages).findIndex(errorMessage => errorMessage) >= 0;

  const titleStyle = useMemo(
    () => [styles.title, theme === THEME_DARK && styles.colorWhite],
    [theme],
  );

  const onChange = (value: string, type: KeysPasswordsT) => {
    setErrorsMessage(state => ({ ...state, [type]: '' }));
    setDataRegistration(state => ({ ...state, [type]: value }));
  };

  const redirectToScreen = () => {
    navigation.navigate(PATHS_MAIN_SCREENS.main);
  };

  const onSubmitClick = async () => {
    if (isError) setErrorsMessage(errorsMessages);
    else {
      await editUser({ ...dataRegistration, is_password: true });
      redirectToScreen();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={titleStyle}>
          <Trans>Now create yourself a strong password.</Trans>
        </Text>
        <InputPassword
          label={t(i18n)`Password`}
          placeholder={t(i18n)`Enter your password`}
          onChangeText={value => {
            onChange(value, 'password');
          }}
          errorMessage={errorsMessage.password}
        />
        <InputPassword
          label={t(i18n)`Repeat password`}
          placeholder={t(i18n)`Enter your password`}
          onChangeText={value => {
            onChange(value, 'confirmPassword');
          }}
          errorMessage={errorsMessage.confirmPassword}
        />
      </View>
      <View style={styles.containerButton}>
        <ButtonCustom
          disabled={isError}
          title={t(i18n)`Continue`}
          onSubmit={onSubmitClick}
          styleContainer={styles.buttonSubmit}
        />
      </View>
    </ScrollView>
  );
};
