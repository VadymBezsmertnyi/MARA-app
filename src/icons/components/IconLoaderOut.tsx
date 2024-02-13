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
  Rect,
} from "react-native-svg";

const SvgIconLoaderOut = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 129 129"
      {...props}
    >
      <Path
        fill="#E6E6E6"
        d="M101.759 12.575A64.001 64.001 0 0 0 9.9 98.147a63.998 63.998 0 0 0 109.779-1.5 63.997 63.997 0 0 0 7.834-42.405l-12.906 2.095a50.926 50.926 0 1 1-20.493-33.154z"
      />
    </Svg>
  );
};

export default SvgIconLoaderOut;
