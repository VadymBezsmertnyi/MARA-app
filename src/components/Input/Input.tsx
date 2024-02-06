import React, { FunctionComponent, useMemo, useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// styles
import { styles } from "./Input.styles";
import colors from "../../../styles/colors";

type InputProps = {
  placeholder: string;
  value?: string;
  label?: string;
  defaultValue?: string;
  onChange: (k: string) => void;
  InputIcon?: React.ReactNode;
  customStyles?: ViewStyle;
  labelStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  isRegular?: boolean;
  isSelect?: boolean;
  maxLength?: number;
};

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value,
  label,
  defaultValue,
  InputIcon,
  onChange,
  customStyles,
  labelStyle,
  keyboardType = "default",
  errorMessage,
  containerStyle,
  isRegular = false,
  isSelect = false,
  maxLength,
}) => {
  const [borderColor, setBorderColor] = useState(colors.platinumGray);

  const onFocus = () => {
    setBorderColor(colors.californiaOrange);
  };

  const onBlur = () => {
    setBorderColor(colors.platinumGray);
  };

  const inputWrapperStyles = useMemo(
    () => ({
      ...styles.inputWrapper,
      borderColor: errorMessage ? colors.errorRed : borderColor,
    }),
    [borderColor, errorMessage]
  );
  const inputStyles = useMemo(
    () => ({ ...styles.input, ...customStyles }),
    [customStyles]
  );
  const containerStyles = useMemo(() => {
    const marginTop = label ? 20 : 0;
    return {
      ...styles.container,
      marginTop,
      flex: customStyles ? 1 : 0,
      ...containerStyle,
    };
  }, [label, customStyles, containerStyle]);

  const labelStyles = useMemo(() => [styles.label, labelStyle], [labelStyle]);

  const titleMaxLengthStyles = useMemo(
    () => [
      styles.titleMaxLength,
      errorMessage ? styles.titleMaxLengthError : undefined,
    ],
    [errorMessage]
  );

  const onChangeText = (newValue: string) => {
    if (!maxLength) onChange(newValue);
    else if (newValue.length <= maxLength) onChange(newValue);
  };
  return (
    <View style={containerStyles}>
      {label && (
        <Text style={labelStyles}>
          {label}
          {isSelect ? ":" : null}
          {isRegular ? (
            <>
              :<Text style={styles.labelRegular}>*</Text>
            </>
          ) : null}
        </Text>
      )}
      <View style={inputWrapperStyles}>
        <TextInput
          style={inputStyles}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={customStyles ? true : false}
          keyboardType={keyboardType}
        />
        {InputIcon}
      </View>
      {value !== undefined && maxLength ? (
        <View style={styles.containerMaxLength}>
          <Text style={titleMaxLengthStyles}>
            {value.length}/{maxLength}
          </Text>
        </View>
      ) : null}
      {errorMessage !== undefined ? (
        <Text style={styles.errorMessage}>{errorMessage || ""}</Text>
      ) : null}
    </View>
  );
};
