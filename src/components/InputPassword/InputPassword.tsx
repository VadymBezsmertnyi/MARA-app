import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// constants
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";
import colors from "../../../styles/colors";

//icons
import { EyeHide, EyeShow } from "../../icons/components";

// styles
import { styles } from "./InputPassword.styles";

type InputProps = {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  placeholder?: string;
} & TextInputProps;

export const InputPassword: FunctionComponent<InputProps> = ({
  label,
  containerStyle = null,
  labelStyle = null,
  inputStyle = null,
  buttonStyle = null,
  errorStyle = null,
  errorMessage,
  placeholder = "",
  ...props
}): JSX.Element => {
  const { theme } = useContext(themeContext);
  const [isShow, setIsShow] = useState(true);
  const containerStyleState = useMemo(
    () => [styles.container, containerStyle],
    [containerStyle]
  );
  const labelStyleState = useMemo(
    () => [
      styles.label,
      theme === THEME_DARK && { color: colors.white },
      labelStyle,
    ],
    [labelStyle, theme]
  );
  const inputContainerStyle = useMemo(
    () => [
      styles.inputContainer,
      theme === THEME_DARK && { backgroundColor: "transparent" },
    ],
    [theme]
  );
  const inputStyleState = useMemo(
    () => [
      styles.inputField,
      theme === THEME_DARK && { color: colors.white },
      inputStyle,
      errorMessage ? styles.inputError : null,
    ],
    [errorMessage, inputStyle, theme]
  );
  const errorStyleState = useMemo(
    () => [styles.errorMessage, errorStyle],
    [errorStyle]
  );

  const handlePasswordVisibility = () => {
    setIsShow((state) => !state);
  };

  return (
    <View style={containerStyleState}>
      {label && <Text style={labelStyleState}>{label}</Text>}
      <View style={inputContainerStyle}>
        <TextInput
          style={inputStyleState}
          placeholder={placeholder}
          secureTextEntry={isShow}
          placeholderTextColor={colors.grayCloudy}
          {...props}
        />
        <Pressable onPress={handlePasswordVisibility} style={buttonStyle}>
          {isShow ? (
            <EyeHide width={24} height={24} />
          ) : (
            <EyeShow width={24} height={24} />
          )}
        </Pressable>
      </View>
      <Text style={errorStyleState}>{errorMessage}</Text>
    </View>
  );
};
