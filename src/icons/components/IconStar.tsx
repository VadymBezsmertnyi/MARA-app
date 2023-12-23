import React from "react";
import { IconType } from "../icon.types";
import {
  Svg,
  Path,
  G,
  Defs,
  Polygon,
  Ellipse,
  Circle,
  Mask,
  Text,
  Stop,
  LinearGradient,
  ClipPath,
  RadialGradient,
} from "react-native-svg";

const SvgIconStar = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg fill="none" viewBox="0 0 20 20" {...props}>
      <Path d="m10.46 15.315 5.693 3.435-1.51-6.475 5.028-4.357-6.622-.561L10.46 1.25 7.871 7.357l-6.622.561 5.029 4.357-1.51 6.475z" />
    </Svg>
  );
};

export default SvgIconStar;
