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

const SvgIconLoaderIn = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 83 83"
      {...props}
    >
      <Path
        stroke="#E6E6E6"
        strokeDasharray="10 10"
        strokeWidth={4}
        d="M5.64 49.517a37 37 0 1 1 27.19 27.84"
      />
    </Svg>
  );
};

export default SvgIconLoaderIn;
