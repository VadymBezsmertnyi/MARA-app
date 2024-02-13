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

const SvgIconLocationMarker = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg fill="none" viewBox="0 0 32 32" {...props}>
      <Path d="M25.333 12a9.334 9.334 0 0 0-18.666 0c0 1.85.545 3.57 1.473 5.02h-.01L16 29.333l7.87-12.313h-.009A9.294 9.294 0 0 0 25.333 12M16 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
    </Svg>
  );
};

export default SvgIconLocationMarker;
