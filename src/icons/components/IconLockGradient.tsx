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

const SvgIconLockGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <G clipPath="url(#icon-lock-gradient_svg__a)">
        <Path
          fill="url(#icon-lock-gradient_svg__b)"
          d="M12.56 14.227a1.606 1.606 0 0 0-.727 3.033v1.907h1.334V17.32a1.607 1.607 0 0 0-.607-3.093"
        />
        <Path
          fill="url(#icon-lock-gradient_svg__c)"
          stroke="url(#icon-lock-gradient_svg__d)"
          strokeWidth={0.2}
          d="M7.067 10.4h-2v11.433A1.433 1.433 0 0 0 6.5 23.267h12a1.433 1.433 0 0 0 1.433-1.434V10.4h-2V7.648a5.567 5.567 0 0 0-5.43-5.675h-.005a5.567 5.567 0 0 0-5.431 5.675zM8.6 7.647v-.003a4.033 4.033 0 0 1 3.9-4.137 4.034 4.034 0 0 1 3.9 4.137V10.4H8.6zm-2 14.086v-9.8h11.8v9.8z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="icon-lock-gradient_svg__b"
          x1={12.569}
          x2={6.592}
          y1={9.049}
          y2={12.661}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-lock-gradient_svg__c"
          x1={12.521}
          x2={-13.809}
          y1={-20.034}
          y2={-2.949}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-lock-gradient_svg__d"
          x1={12.521}
          x2={-13.809}
          y1={-20.034}
          y2={-2.949}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <ClipPath id="icon-lock-gradient_svg__a">
          <Path fill="#fff" d="M.5.5h24v24H.5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconLockGradient;
