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

const SvgIconArrowLeftEventGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 44 44"
      {...props}
    >
      <Path
        stroke="url(#icon-arrow-left-event-gradient_svg__a)"
        strokeLinecap="round"
        strokeWidth={2.5}
        d="M29 7 13.778 21.27a1 1 0 0 0 0 1.46L29 37"
      />
      <Defs>
        <LinearGradient
          id="icon-arrow-left-event-gradient_svg__a"
          x1={20.977}
          x2={53.691}
          y1={-24.442}
          y2={-8.16}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconArrowLeftEventGradient;
