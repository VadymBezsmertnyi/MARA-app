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

const SvgIconArrowRightNew = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 18"
      {...props}
    >
      <Path
        stroke="url(#icon-arrow-right-new_svg__a)"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="m1 1 7.293 7.293a1 1 0 0 1 0 1.414L1 17"
      />
      <Defs>
        <LinearGradient
          id="icon-arrow-right-new_svg__a"
          x1={5.012}
          x2={-11.748}
          y1={-15.769}
          y2={-7.949}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconArrowRightNew;
