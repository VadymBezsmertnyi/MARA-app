import React, { FunctionComponent, useMemo, useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
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
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
};

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value,
  label,
  defaultValue,
  InputIcon,
  onChange,
  customStyles,
  keyboardType = "default",
  errorMessage,
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
    };
  }, [label, customStyles]);
  return (
    <View style={containerStyles}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputWrapperStyles}>
        <TextInput
          style={inputStyles}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline={customStyles ? true : false}
          keyboardType={keyboardType}
        />
        {InputIcon}
      </View>
    </View>
  );
};
