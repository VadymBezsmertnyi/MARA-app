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

const SvgIconArrowDownGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 10"
      {...props}
    >
      <Path
        stroke="#FD7102"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M17 1 9.23 8.313a1 1 0 0 1-1.415-.044L1 1"
      />
    </Svg>
  );
};

export default SvgIconArrowDownGradient;
