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
      ...containerStyle,
    };
  }, [label, customStyles, containerStyle]);
  const inputTitleStyles = useMemo(
    () => [styles.inputPlaceholder, value?.length > 0 && styles.inputValue],
    [value]
  );
  const labelStyles = useMemo(() => [styles.label, labelStyle], [labelStyle]);

  return (
    <View style={containerStyles}>
      {label && <Text style={labelStyles}>{label}</Text>}
      <View style={inputWrapperStyles}>
        <TouchableOpacity
          style={inputStyles}
          onFocus={onFocus}
          onBlur={onBlur}
          onPress={onPress}
        >
          <Text numberOfLines={1} style={inputTitleStyles}>
            {value || placeholder}
          </Text>
        </TouchableOpacity>
        {InputIcon}
      </View>
    </View>
  );
};
