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

const SvgIconWrapItemsGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Rect
        width={7.5}
        height={7.5}
        x={0.75}
        y={0.75}
        stroke="url(#icon-wrap-items-gradient_svg__a)"
        strokeWidth={1.5}
        rx={0.75}
      />
      <Rect
        width={7.5}
        height={7.5}
        x={11.75}
        y={0.75}
        stroke="url(#icon-wrap-items-gradient_svg__b)"
        strokeWidth={1.5}
        rx={0.75}
      />
      <Rect
        width={7.5}
        height={7.5}
        x={0.75}
        y={11.75}
        stroke="url(#icon-wrap-items-gradient_svg__c)"
        strokeWidth={1.5}
        rx={0.75}
      />
      <Rect
        width={7.5}
        height={7.5}
        x={11.75}
        y={11.75}
        stroke="url(#icon-wrap-items-gradient_svg__d)"
        strokeWidth={1.5}
        rx={0.75}
      />
      <Defs>
        <LinearGradient
          id="icon-wrap-items-gradient_svg__a"
          x1={4.513}
          x2={-7.759}
          y1={-9.433}
          y2={2.02}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-wrap-items-gradient_svg__b"
          x1={15.513}
          x2={3.241}
          y1={-9.433}
          y2={2.02}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-wrap-items-gradient_svg__c"
          x1={4.513}
          x2={-7.759}
          y1={1.567}
          y2={13.02}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-wrap-items-gradient_svg__d"
          x1={15.513}
          x2={3.241}
          y1={1.567}
          y2={13.02}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconWrapItemsGradient;
