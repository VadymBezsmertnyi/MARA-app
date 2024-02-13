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

const SvgIconArrowRightEvent = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 44 44"
      {...props}
    >
      <Path
        stroke="url(#icon-arrow-right-event_svg__a)"
        strokeLinecap="round"
        strokeWidth={2.5}
        d="m13 37 15.222-14.27a1 1 0 0 0 0-1.46L13 7"
      />
      <Defs>
        <LinearGradient
          id="icon-arrow-right-event_svg__a"
          x1={21.023}
          x2={-11.691}
          y1={68.442}
          y2={52.16}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconArrowRightEvent;
