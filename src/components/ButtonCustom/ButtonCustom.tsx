import React, { ReactElement, useContext, useMemo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
  onSubmit: () => void;
  type?: "full" | "transparent";
  styleButton?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  styleLinear?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  children?: ReactElement;
  colorsGradientProps?: [string, string];
};

export const ButtonCustom = ({
  title,
  disabled = false,
  onSubmit,
  type = "full",
  styleButton,
  styleContainer,
  styleLinear,
  styleTitle,
  children,
  colorsGradientProps,
}: Props) => {
  const { theme } = useContext(themeContext);
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
    ],
    [type, styleTitle]
  );
  const colorsGradient = useMemo(
    () =>
      colorsGradientProps
        ? colorsGradientProps
        : [colors.californiaOrange, colors.blazeOrange],
    [colorsGradientProps]
  );
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  return (
    <View style={styleContainerState}>
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        locations={locationsGradient}
        style={styleLinearGradient}
      >
        <TouchableOpacity
          disabled={disabled}
          onPress={onSubmit}
          style={stylePressable}
        >
          {children ? children : <Text style={styleText}>{title}</Text>}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
