import React, { FunctionComponent, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// styles
import colors from "../../../styles/colors";

type LinearGradientCustomProps = {
  children?: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

export const LinearGradientCustom: FunctionComponent<
  LinearGradientCustomProps
> = ({ children, style }) => {
  const colorsGradient = useMemo(
    () => [colors.californiaOrange, colors.blazeOrange],
    []
  );
  const startGradient = useMemo(() => ({ x: 0.9, y: 0.5 }), []);
  const endGradient = useMemo(() => ({ x: 0.1, y: 0.5 }), []);
  const locationsGradient = useMemo(() => [0, 1], []);

  return children ? (
    <LinearGradient
      colors={colorsGradient}
      start={startGradient}
      end={endGradient}
      locations={locationsGradient}
      style={style}
    >
      {children}
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={colorsGradient}
      start={startGradient}
      end={endGradient}
      locations={locationsGradient}
      style={style}
    />
  );
};
