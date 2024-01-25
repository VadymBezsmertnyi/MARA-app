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

const SvgIconArrowLeftEvent = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      {...props}
    >
      <Path
        stroke="#38312C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15.5 18-6-6 6-6"
      />
    </Svg>
  );
};

export default SvgIconArrowLeftEvent;
