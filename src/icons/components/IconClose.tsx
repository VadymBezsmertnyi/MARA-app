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

const SvgIconClose = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M17.657 6.657a1 1 0 0 1 0 1.414l-4.243 4.243 4.243 4.242a1 1 0 0 1-1.414 1.415L12 13.728 7.757 17.97a1 1 0 0 1-1.414-1.415l4.243-4.242L6.343 8.07a1 1 0 1 1 1.414-1.414L12 10.9l4.243-4.243a1 1 0 0 1 1.414 0"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SvgIconClose;
