import { t, Trans } from '@lingui/macro';
import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import { DimensionValue, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from '@react-navigation/native';

// types
import { AuthorizationT, KeysAuthorizationT } from './Authorization.types';

// components
import { ButtonCustom } from '../../components/ButtonCustom/ButtonCustom';
import { InputPhone } from '../../components/InputPhone/InputPhone';
import { InputPassword } from '../../components/InputPassword/InputPassword';
import { Social } from '../../components/Social/Social';

// helps
import { useAllNavigation, useMainRoute } from '../../navigators/Navigators.helps';

// icons
import { IconFaceIdGradient, IconTouchIdGradient } from '../../icons/components';

// providers
import { localesContext } from '../../../localization/localization.provider';
import { biometricAuthenticatorContext } from '../../providers/biometricAuthenticator/biometricAuthenticator.provider';
import { userContext } from '../../providers/user/user.provider';
import { themeContext } from '../../providers/theme/theme.provider';
import { ResponsiveLayoutProvider } from '../../providers/responsiveLayout/responsiveLayout.provider';

// constants
import { DEFAULT_CODE_COUNTRY, DEFAULT_COUNTRY } from '../../constants/inputs.const';
import { PATHS_MAIN_SCREENS } from '../../navigators/useNavigator.constants';
import { THEME_DARK } from '../../providers/theme/theme.const';

// hooks
import { useAuthorizationRegistration } from '../../helps/useAuthorizationRegistration';
import { getClearValue } from '../../helps/regexp';
import showErrors from '../../helps/errors/showError';

// styles
import { styles } from './Authorization.styles';

// magic numbers
const ADD_WIDTH_BUTTON_SUBMIT = 20;
const PRIMARY_SIZE_BUTTON_SUBMIT = 60;

const DEFAULT_DATA_AUTHORIZATION: AuthorizationT = {
  phone: '',
  password: '',
};

export const Authorization: FunctionComponent = (): JSX.Element => {
  const navigation = useAllNavigation();
  const { warning } = showErrors;
  const { params } = useMainRoute(PATHS_MAIN_SCREENS.authorization);
  const { theme } = useContext(themeContext);
  const { i18n } = useContext(localesContext);
  const { loginUser } = useContext(userContext);
  const { isTouchId, isFaceId, checkBiometric } = useContext(biometricAuthenticatorContext);
  const { verifyPhone, verifyPassword } = useAuthorizationRegistration();
  const [dataAuthorization, setDataAuthorization] = useState<AuthorizationT>(
    DEFAULT_DATA_AUTHORIZATION,
  );
  const [errorsMessage, setErrorsMessage] = useState<AuthorizationT>(DEFAULT_DATA_AUTHORIZATION);
  const [selectCountryIso, setSelectCountryIso] = useState(DEFAULT_COUNTRY);

  const linkTo = useMemo(
    () => ({
      screen: PATHS_MAIN_SCREENS.forget,
      params: { phoneNumber: params?.phoneNumber || dataAuthorization.phone || undefined },
    }),
    [params?.phoneNumber, dataAuthorization.phone],
  );

  const errorsMessages: AuthorizationT = useMemo(
    () => ({
      phone: verifyPhone(dataAuthorization.phone, selectCountryIso),
      password: verifyPassword(dataAuthorization.password),
    }),
    [
      dataAuthorization.password,
      dataAuthorization.phone,
      selectCountryIso,
      verifyPassword,
      verifyPhone,
    ],
  );

  const isError: boolean = useMemo(
    () => Object.values(errorsMessages).findIndex(errorMessage => errorMessage) >= 0,
    [errorsMessages],
  );

  const onChange = (name: KeysAuthorizationT, value: string) => {
    setDataAuthorization(state => ({ ...state, [name]: value }));
    setErrorsMessage(state => ({ ...state, [name]: '' }));
  };

  const onSubmit = async () => {
    if (isError) setErrorsMessage(errorsMessages);
    else {
      const result = await loginUser({
        ...dataAuthorization,
        phone: getClearValue(dataAuthorization.phone),
      });
      if (result) {
        navigation.navigate(PATHS_MAIN_SCREENS.main);
        setDataAuthorization(DEFAULT_DATA_AUTHORIZATION);
      }
    }
  };

  const isShowTouchId = useMemo(() => Platform.OS !== 'web' && isTouchId, [isTouchId]);
  const isShowFaceId = useMemo(() => Platform.OS !== 'web' && isFaceId, [isFaceId]);
  const widthTouchId = useMemo(
    () => (isShowTouchId ? 0 : ADD_WIDTH_BUTTON_SUBMIT),
    [isShowTouchId],
  );
  const widthFaceId = useMemo(() => (isShowFaceId ? 0 : ADD_WIDTH_BUTTON_SUBMIT), [isShowFaceId]);
  const styleContainerButtonCustom = useMemo(
    () => ({
      width: `${PRIMARY_SIZE_BUTTON_SUBMIT + widthTouchId + widthFaceId}%` as DimensionValue,
    }),
    [widthFaceId, widthTouchId],
  );
  const titleStyle = useMemo(
    () => [styles.title, theme === THEME_DARK ? styles.colorWhite : {}],
    [theme],
  );

  useEffect(() => {
    if (params?.phoneNumber) {
      const phone = params.phoneNumber;
      setDataAuthorization(state => ({ ...state, phone }));
      warning(
        t(
          i18n,
        )`You are already registered, please proceed with the authorization, or you can reset your password`,
      );
    }
  }, []);

  return (
    <ResponsiveLayoutProvider>
      <View style={styles.screenContainer}>
        <ScrollView style={styles.inputsOther}>
          <Text style={titleStyle}>
            <Trans>For authorization please enter phone number and password</Trans>
          </Text>
          <InputPhone
            phoneNumber={dataAuthorization.phone || `+${DEFAULT_CODE_COUNTRY}`}
            setPhoneNumber={value => {
              onChange('phone', value);
            }}
            selectCountryIso={selectCountryIso}
            setSelectCountryIso={setSelectCountryIso}
            errorMessage={errorsMessage.phone}
            label={t(i18n)`Please enter your phone number`}
          />
          <InputPassword
            value={dataAuthorization.password}
            onChangeText={value => {
              onChange('password', value);
            }}
            errorMessage={errorsMessage.password}
            label={t(i18n)`Password`}
            placeholder={t(i18n)`Please enter your password`}
          />
          <View style={styles.containerForgetPassword}>
            <Link style={styles.linkForgetPassword} to={linkTo}>
              <View style={styles.containerLinkForgetPassword}>
                <Text style={styles.titleForgetPassword}>
                  <Trans>Forget password?</Trans>
                </Text>
              </View>
            </Link>
          </View>
          <Social />
        </ScrollView>
        <View style={styles.containerButtons}>
          <ButtonCustom
            styleContainer={styleContainerButtonCustom}
            disabled={isError}
            title={t(i18n)`Login`}
            onSubmit={onSubmit}
          />
          {isShowTouchId && (
            <Pressable onPress={checkBiometric}>
              <IconTouchIdGradient width={52} height={52} stroke="black" fill="none" />
            </Pressable>
          )}
          {isShowFaceId && (
            <Pressable onPress={checkBiometric}>
              <IconFaceIdGradient width={52} height={52} stroke="none" fill="black" />
            </Pressable>
          )}
        </View>
      </View>
    </ResponsiveLayoutProvider>
  );
};
