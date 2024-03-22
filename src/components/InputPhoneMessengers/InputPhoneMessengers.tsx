import React, { FunctionComponent, useMemo } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";

// components
import { InputPhone } from "../InputPhone/InputPhone";

// styles
import { styles } from "./InputPhoneMessengers.styles";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";
import {
  IconLogoTelegram,
  IconLogoViber,
  IconLogoWhatsApp,
} from "../../icons/components";

type InputPhoneMessengersProps = {
  label?: string;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  selectCountryIso: string;
  setSelectCountryIso: (value: string) => void;
  labelStyle?: StyleProp<TextStyle>;
  containerInputPhoneStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isViber: boolean;
  setIsViber: (value: boolean) => void;
  isWhatsApp: boolean;
  setIsWhatsApp: (value: boolean) => void;
  isTelegram: boolean;
  setIsTelegram: (value: boolean) => void;
  errorMessage?: string;
  isGradientCheckbox?: boolean;
  containerStyleCheckbox?: StyleProp<ViewStyle>;
};

export const InputPhoneMessengers: FunctionComponent<
  InputPhoneMessengersProps
> = ({
  label,
  phoneNumber,
  setPhoneNumber,
  selectCountryIso,
  setSelectCountryIso,
  labelStyle,
  containerInputPhoneStyle,
  errorStyle,
  containerStyle,
  isViber,
  setIsViber,
  isWhatsApp,
  setIsWhatsApp,
  isTelegram,
  setIsTelegram,
  errorMessage,
  isGradientCheckbox = true,
  containerStyleCheckbox,
}) => {
  const containerStyles = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );
  const containerInputPhoneStyles = useMemo(
    () => [styles.containerInput, containerInputPhoneStyle],
    [containerInputPhoneStyle]
  );
  const errorStyles = useMemo(
    () => [styles.errorStyle, errorStyle],
    [errorStyle]
  );

  return (
    <View style={containerStyles}>
      <InputPhone
        label={label}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        selectCountryIso={selectCountryIso}
        setSelectCountryIso={setSelectCountryIso}
        labelStyle={labelStyle}
        containerStyle={containerInputPhoneStyles}
        errorStyle={errorStyles}
        errorMessage={errorMessage}
      />
      <View style={styles.containerMessengers}>
        <View style={styles.containerMessenger}>
          <CheckboxClassic
            isGradient={isGradientCheckbox}
            check={isViber}
            setCheck={setIsViber}
            containerStyle={containerStyleCheckbox}
          />
          <IconLogoViber width={30} height={30} />
        </View>
        <View style={styles.containerMessenger}>
          <CheckboxClassic
            isGradient={isGradientCheckbox}
            check={isWhatsApp}
            setCheck={setIsWhatsApp}
            containerStyle={containerStyleCheckbox}
          />
          <IconLogoWhatsApp width={30} height={30} />
        </View>
        <View style={styles.containerMessenger}>
          <CheckboxClassic
            isGradient={isGradientCheckbox}
            check={isTelegram}
            setCheck={setIsTelegram}
            containerStyle={containerStyleCheckbox}
          />
          <IconLogoTelegram width={30} height={30} />
        </View>
      </View>
    </View>
  );
};
