import React, { ReactElement, useContext, useMemo, useState } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";

// providers
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// constants
import colors from "../../../styles/colors";
import { THEME_DARK } from "../../providers/ThemeProvider/ThemeProvider.const";

//styles
import { styles } from "./ButtonCustom.styles";

type Props = {
  title?: string;
  disabled?: boolean;
  disabledShadow?: boolean;
  onSubmit: () => void;
  type?: "full" | "transparent";
  styleButton?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  styleLinear?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  children?: ReactElement;
  colorsGradientProps?: [string, string];
  onPressFocus?: (value: boolean) => void;
  accessibilityLabel?: string;
};

export const ButtonCustom = ({
  title,
  disabled = false,
  disabledShadow = false,
  onSubmit,
  type = "full",
  styleButton,
  styleContainer,
  styleLinear,
  styleTitle,
  children,
  colorsGradientProps,
  onPressFocus,
  accessibilityLabel,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useContext(themeContext);
  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );
  const styleContainerState = useMemo(
    () => [styles.container, styleContainer],
    [styleContainer]
  );
  const styleLinearGradient = useMemo(
    () => [styles.linearGradient, disabled && styles.disabled, styleLinear],
    [disabled, styleLinear]
  );
  const stylePressable = useMemo(
    () => [
      styles.buttonSubmit,
      theme === THEME_DARK && styles.dark,
      type === "full" && styles.full,
      styleButton,
    ],
    [styleButton, theme, type]
  );
  const styleText = useMemo(
    () => [
      styles.buttonSubmitText,
      type !== "full" ? styles.transparent : null,
      styleTitle,
      isFocus && { color: colors.white },
    ],
    [type, styleTitle, isFocus]
  );
  const colorsGradient = useMemo(() => {
    if (colorsGradientProps) return colorsGradientProps;
    if (isFocus) return [colors.chileanFireOrange, colors.chileanFireOrange];
    return [colors.californiaOrange, colors.blazeOrange];
  }, [colorsGradientProps, isFocus]);
  const startGradient = useMemo(
    () => (isFocus ? { x: 0, y: 0 } : { x: 0.9, y: 0.5 }),
    [isFocus]
  );
  const endGradient = useMemo(
    () => (isFocus ? { x: 0, y: 0 } : { x: 0.1, y: 0.5 }),
    [isFocus]
  );
  const locationsGradient = useMemo(
    () => (isFocus ? [0, 0] : [0, 1]),
    [isFocus]
  );

  return (
    <View style={styleContainerState}>
      <Shadow
        stretch
        distance={4}
        disabled={disabledShadow || type === "transparent" || disabled}
        startColor={colors.shadowButton}
        offset={offsetShadow}
      >
        <LinearGradient
          colors={colorsGradient}
          start={startGradient}
          end={endGradient}
          locations={locationsGradient}
          style={styleLinearGradient}
        >
          <TouchableHighlight
            disabled={disabled}
            accessibilityLabel={accessibilityLabel}
            onPress={onSubmit}
            style={stylePressable}
            underlayColor={colors.chileanFireOrange}
            onPressIn={() => {
              setIsFocus(true);
              if (onPressFocus) onPressFocus(true);
            }}
            onPressOut={() => {
              setIsFocus(false);
              if (onPressFocus) onPressFocus(false);
            }}
          >
            {children ? children : <Text style={styleText}>{title}</Text>}
          </TouchableHighlight>
        </LinearGradient>
      </Shadow>
    </View>
  );
};
