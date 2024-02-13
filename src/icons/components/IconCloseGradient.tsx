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

const SvgIconCloseGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="url(#icon-close-gradient_svg__a)"
        fillRule="evenodd"
        d="M17.657 6.657a1 1 0 0 1 0 1.414l-4.243 4.243 4.243 4.242a1 1 0 0 1-1.414 1.415L12 13.728 7.757 17.97a1 1 0 0 1-1.414-1.415l4.243-4.242L6.343 8.07a1 1 0 1 1 1.414-1.414L12 10.9l4.243-4.243a1 1 0 0 1 1.414 0"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="icon-close-gradient_svg__a"
          x1={29.531}
          x2={-0.294}
          y1={-5.184}
          y2={-6.215}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconCloseGradient;
