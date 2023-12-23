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

const SvgArrowDown = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8" {...props}>
      <Path d="M6.5 8 .005.5h12.99z" />
    </Svg>
  );
};

export default SvgArrowDown;
