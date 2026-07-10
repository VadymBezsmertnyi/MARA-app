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

const SvgIconCheck = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <Path
        fill="#fff"
        d="M14.247.201a1.25 1.25 0 0 0-1.729.369L5.514 11.366 2.098 8.208a1.25 1.25 0 0 0-1.697 1.835l4.485 4.147s.13.11.189.15a1.25 1.25 0 0 0 1.729-.369l7.812-12.04A1.25 1.25 0 0 0 14.247.2"
      />
    </Svg>
  );
};

export default SvgIconCheck;
