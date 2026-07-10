import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// styles
import { styles } from "./InputButton.styles";
import colors from "../../../styles/colors";

type InputButtonProps = {
  placeholder: string;
  value?: string;
  label?: string;
  InputIcon?: React.ReactNode;
  customStyles?: ViewStyle;
  onPress: () => void;
  errorMessage?: string;
  inputWrapperStyle?: ViewStyle;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  isRegular?: boolean;
  isSelect?: boolean;
  leftElementInput?: React.ReactNode;
  rightElementInput?: React.ReactNode;
  disabled?: boolean;
  isMultiLines?: boolean;
};

export const InputButton: FunctionComponent<InputButtonProps> = ({
  placeholder,
  value = "",
  label,
  InputIcon,
  customStyles,
  onPress,
  errorMessage,
  inputWrapperStyle,
  labelStyle,
  containerStyle,
  isRegular = false,
  isSelect = false,
  leftElementInput = null,
  rightElementInput = null,
  disabled = false,
  isMultiLines = false,
}) => {
  const [borderColor, setBorderColor] = useState(colors.platinumGray);

  const onFocus = () => {
    setBorderColor(colors.californiaOrange);
  };

  const onBlur = () => {
    if (!value) setBorderColor(colors.platinumGray);
  };

  const inputWrapperStyles = useMemo(
    () => ({
      ...styles.inputWrapper,
      borderColor: errorMessage ? colors.errorRed : borderColor,
      ...inputWrapperStyle,
    }),
    [borderColor, errorMessage, inputWrapperStyle]
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
      opacity: disabled ? 0.5 : 1,
      ...containerStyle,
    };
  }, [label, customStyles, containerStyle, disabled]);
  const inputTitleStyles = useMemo(
    () => [styles.inputPlaceholder, value?.length > 0 && styles.inputValue],
    [value]
  );
  const labelStyles = useMemo(() => [styles.label, labelStyle], [labelStyle]);

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
        <TouchableOpacity
          disabled={disabled}
          style={inputStyles}
          onFocus={onFocus}
          onBlur={onBlur}
          onPress={onPress}
        >
          {leftElementInput}
          <Text
            numberOfLines={isMultiLines ? undefined : 1}
            style={inputTitleStyles}
          >
            {value || placeholder}
          </Text>
          {rightElementInput}
        </TouchableOpacity>
        {InputIcon}
      </View>
      {errorMessage !== undefined ? (
        <Text style={styles.errorMessage}>{errorMessage || ""}</Text>
      ) : null}
    </View>
  );
};
