import React, { useContext, useMemo } from "react";
import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import infoPhoneCountries from "country-telephone-data";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// constants
import {
  DEFAULT_CODE_COUNTRY,
  DEFAULT_COUNTRY,
} from "../../constants/inputs.const";
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";

// helps
import { getClearValue } from "../../helps/regexp";

// icons
import { ArrowDown } from "../../icons/components";

// styles
import { styles } from "./InputPhone.styles";
import colors from "../../../styles/colors";

type InputProps = {
  isRegular?: boolean;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  selectCountryIso: string;
  setSelectCountryIso: (value: string) => void;
  setIsVerify?: (value: boolean) => void;
  label?: string;
  errorMessage?: string;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

export const InputPhone = ({
  isRegular = false,
  phoneNumber,
  setPhoneNumber,
  selectCountryIso,
  setSelectCountryIso,
  setIsVerify,
  label,
  errorMessage,
  inputStyle,
  labelStyle,
  containerStyle,
  errorStyle,
}: InputProps) => {
  const { theme } = useContext(themeContext);
  const textPropsPhoneInput = useMemo(
    () => ({ value: phoneNumber }),
    [phoneNumber]
  );

  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );
  const labelStyles: StyleProp<TextStyle> = useMemo(
    () => [
      styles.label,
      theme === THEME_DARK && styles.colorWhite,
      labelStyle,
      errorMessage?.length
        ? {
            color: colors.errorRed,
          }
        : {},
    ],
    [labelStyle, theme, errorMessage]
  );
  const phoneInputStyles: StyleProp<TextStyle> = useMemo(
    () => [
      styles.phoneInput,
      inputStyle,
      errorMessage?.length
        ? {
            borderColor: colors.errorRed,
          }
        : {},
    ],
    [inputStyle, errorMessage]
  );
  const errorMessageStyles = useMemo(
    () => [styles.errorMessage, errorStyle],
    [errorStyle]
  );

  const selectCountry = useMemo(
    () =>
      infoPhoneCountries.allCountries.find(
        (country) => country.iso2 === selectCountryIso
      ) || null,
    [selectCountryIso]
  );
  const clearFormat = useMemo(
    () => getClearValue(selectCountry?.format || ""),
    [selectCountry?.format]
  );
  const containerFlagStyle = useMemo(
    () => [styles.containerFlag, theme === THEME_DARK && styles.backgroundDark],
    [theme]
  );

  const onSelectCountry = (iso: string) => {
    const selectCountry = infoPhoneCountries.allCountries.find(
      (country) => country.iso2 === iso
    );
    setSelectCountryIso(selectCountry?.iso2 || DEFAULT_COUNTRY);
    setPhoneNumber(`+${selectCountry?.dialCode || DEFAULT_CODE_COUNTRY}`);
  };

  const onChange = (value: string) => {
    const clearValue = getClearValue(value);
    if (clearValue.length <= clearFormat.length) setPhoneNumber(value);
    if (setIsVerify)
      if (clearValue.length === clearFormat.length) setIsVerify(true);
      else setIsVerify(false);
  };

  const renderFlag = ({ imageSource }: { imageSource: number }) => (
    <View style={containerFlagStyle}>
      <Image source={imageSource} style={styles.flagIcon} />
      <ArrowDown
        width={15}
        height={10}
        fill={theme === THEME_DARK ? colors.white : colors.black}
      />
    </View>
  );

  return (
    <View style={containerStyles}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {isRegular ? (
            <>
              :<Text style={styles.labelRegular}>*</Text>
            </>
          ) : (
            ":"
          )}
        </Text>
      )}
      <PhoneInput
        textProps={textPropsPhoneInput}
        style={phoneInputStyles}
        textStyle={theme === THEME_DARK && styles.colorWhite}
        initialCountry={DEFAULT_COUNTRY}
        initialValue={DEFAULT_CODE_COUNTRY}
        onSelectCountry={onSelectCountry}
        onChangePhoneNumber={onChange}
        autoFormat
        renderFlag={renderFlag}
      />
      <Text style={errorMessageStyles}>{errorMessage}</Text>
    </View>
  );
};
