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

const SvgIconLikeGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 38 38"
      {...props}
    >
      <Path
        fill="url(#icon-like-gradient_svg__a)"
        d="M23.563 9c-1.884 0-3.555.743-4.688 2.021C17.742 9.743 16.071 9 14.188 9A6.195 6.195 0 0 0 8 15.188c0 6.781 9.92 12.2 10.342 12.428a1.125 1.125 0 0 0 1.066 0c.422-.228 10.342-5.647 10.342-12.428A6.195 6.195 0 0 0 23.563 9m-.515 13.346a30.82 30.82 0 0 1-4.173 2.982 30.82 30.82 0 0 1-4.173-2.982c-2.031-1.743-4.452-4.4-4.452-7.158a3.937 3.937 0 0 1 3.938-3.938c1.668 0 3.065.881 3.645 2.3a1.125 1.125 0 0 0 2.084 0c.58-1.419 1.977-2.3 3.645-2.3a3.937 3.937 0 0 1 3.938 3.938c0 2.758-2.42 5.415-4.452 7.158"
      />
      <Defs>
        <LinearGradient
          id="icon-like-gradient_svg__a"
          x1={18.907}
          x2={-6.643}
          y1={-10.652}
          y2={17.005}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconLikeGradient;
