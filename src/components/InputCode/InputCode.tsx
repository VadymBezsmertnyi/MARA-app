import React, { FunctionComponent, useCallback, useMemo } from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

// providers
import { useThemeProvider } from "../../providers/ThemeProvider/ThemeProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";

// styles
import { styles } from "./InputCode.styles";

type InputCodeProps = {
  value: string;
  setValue: (value: string) => void;
  title: string;
  subTitle?: string;
  styleContainerInput?: StyleProp<TextStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleContainerCode?: StyleProp<TextStyle>;
  isResendCode?: boolean;
  onResendCode?: () => void;
  cellCount: number;
  errorMessage?: string;
};

export const InputCode: FunctionComponent<InputCodeProps> = ({
  value,
  setValue,
  title,
  subTitle,
  styleTitle,
  styleContainerInput,
  styleContainerCode,
  isResendCode = false,
  onResendCode,
  cellCount,
  errorMessage,
}) => {
  const { theme } = useThemeProvider();
  const { i18n } = useLocalesProvider();
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const stylesCodeFieldInput = useCallback(
    (isFocused: boolean) => [
      styles.input,
      theme === THEME_DARK && styles.colorWhite,
      isFocused && styles.focusCell,
    ],
    [theme]
  );

  const stylesContainer = useMemo(
    () => [styles.container, styleContainerInput],
    [styleContainerInput]
  );
  const stylesTitle = useMemo(
    () => [styles.title, theme === THEME_DARK && styles.colorWhite, styleTitle],
    [styleTitle, theme]
  );
  const stylesSubTitle = useMemo(
    () => [styles.subTitle, theme === THEME_DARK && styles.colorWhite],
    [theme]
  );
  const stylesContainerCode = useMemo(
    () => [styles.containerCode, styleContainerCode],
    [styleContainerCode]
  );

  return (
    <ScrollView style={stylesContainer}>
      <View style={styles.containerMain}>
        <View style={styles.containerTitles}>
          <Text style={stylesTitle}>{title}</Text>
          {subTitle ? <Text style={stylesSubTitle}>{subTitle}</Text> : null}
        </View>
        <View style={stylesContainerCode}>
          <View style={styles.containerCodeInputs}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={cellCount}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={stylesCodeFieldInput(isFocused)}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : "-")}
                </Text>
              )}
            />
          </View>
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
      {isResendCode && (
        <View style={styles.containerResend}>
          <TouchableOpacity
            onPress={onResendCode}
            style={styles.buttonResendCode}
          >
            <View style={styles.containerResendCode}>
              <Text style={styles.resendCode}>{i18n._("Resend the code")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
