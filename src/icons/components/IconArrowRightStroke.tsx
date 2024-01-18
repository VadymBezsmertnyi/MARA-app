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

const SvgIconArrowRightStroke = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 9 18"
      {...props}
    >
      <Path d="m.5 1 7.313 7.77a1 1 0 0 1-.044 1.415L.5 17" />
    </Svg>
  );
};

export default SvgIconArrowRightStroke;
