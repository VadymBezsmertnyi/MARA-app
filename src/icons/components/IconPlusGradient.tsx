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

const SvgIconPlusGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 34 34"
      {...props}
    >
      <Path
        stroke="url(#icon-plus-gradient_svg__a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M17.195 2v30M2 16.43h30"
      />
      <Defs>
        <LinearGradient
          id="icon-plus-gradient_svg__a"
          x1={17.044}
          x2={-23.865}
          y1={-29.442}
          y2={8.734}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconPlusGradient;
