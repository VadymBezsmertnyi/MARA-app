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

const SvgArrowLongRight = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg fill="none" viewBox="0 0 41 12" {...props}>
      <Path d="M40.53 6.53a.75.75 0 0 0 0-1.06L35.757.697a.75.75 0 0 0-1.06 1.06L38.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6.75h40v-1.5H0z" />
    </Svg>
  );
};

export default SvgArrowLongRight;
