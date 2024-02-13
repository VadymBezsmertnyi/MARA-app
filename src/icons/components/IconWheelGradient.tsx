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

const SvgIconWheelGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <Path
        fill="url(#icon-wheel-gradient_svg__a)"
        fillRule="evenodd"
        d="M12.5 3.25a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5M1.75 12.5c0-5.937 4.813-10.75 10.75-10.75S23.25 6.563 23.25 12.5 18.437 23.25 12.5 23.25 1.75 18.437 1.75 12.5m5.553-.75h2.55a2.74 2.74 0 0 1 .675-1.166l-1.276-2.21a5.245 5.245 0 0 0-1.949 3.376m3.248-4.126 1.275 2.21a2.756 2.756 0 0 1 1.348 0l1.275-2.21A5.236 5.236 0 0 0 12.5 7.25c-.689 0-1.346.133-1.949.374m5.196.75-1.276 2.21c.314.322.549.721.675 1.166h2.55a5.245 5.245 0 0 0-1.95-3.375m1.949 4.876h-2.55a2.74 2.74 0 0 1-.675 1.166l1.276 2.21a5.245 5.245 0 0 0 1.949-3.376m-3.248 4.126-1.275-2.21a2.753 2.753 0 0 1-1.348 0l-1.275 2.21c.602.241 1.26.374 1.949.374.689 0 1.347-.133 1.95-.374m-5.197-.75 1.276-2.21a2.748 2.748 0 0 1-.674-1.166h-2.55a5.245 5.245 0 0 0 1.948 3.375m2.634-3.037-.011-.006-.01-.006a1.25 1.25 0 0 1-.005-2.151l.015-.008.015-.01a1.245 1.245 0 0 1 1.217 0l.018.01.017.01a1.25 1.25 0 0 1-.01 2.15l-.007.005a1.243 1.243 0 0 1-1.24.006M5.75 12.5a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="icon-wheel-gradient_svg__a"
          x1={12.531}
          x2={-16.786}
          y1={-20.784}
          y2={6.576}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconWheelGradient;
