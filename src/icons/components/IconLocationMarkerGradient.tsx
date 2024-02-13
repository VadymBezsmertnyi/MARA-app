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

const SvgIconLocationMarkerGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <Path
        fill="url(#icon-location-marker-gradient_svg__a)"
        d="M10 4.35c0-.506-.103-1.006-.304-1.473a3.844 3.844 0 0 0-.868-1.25A4.014 4.014 0 0 0 7.531.794a4.136 4.136 0 0 0-3.062 0 4.014 4.014 0 0 0-1.297.835 3.844 3.844 0 0 0-.868 1.249A3.725 3.725 0 0 0 2 4.35c0 .763.234 1.472.631 2.07h-.004L6 11.5l3.373-5.08H9.37A3.73 3.73 0 0 0 10 4.35M6 6c-.455 0-.89-.174-1.212-.483a1.62 1.62 0 0 1-.502-1.167c0-.438.18-.857.502-1.167.321-.31.757-.483 1.212-.483.455 0 .89.174 1.212.483.322.31.502.73.502 1.167 0 .438-.18.857-.502 1.167C6.891 5.827 6.455 6 6 6"
      />
      <Defs>
        <LinearGradient
          id="icon-location-marker-gradient_svg__a"
          x1={6.012}
          x2={-7.961}
          y1={-11.029}
          y2={-1.546}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconLocationMarkerGradient;
