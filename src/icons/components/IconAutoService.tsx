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

const SvgIconAutoService = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
    >
      <G filter="url(#icon-auto-service_svg__a)">
        <Circle cx={14} cy={12} r={10} fill="#009A47" />
        <Circle cx={14} cy={12} r={10} fill="url(#icon-auto-service_svg__b)" />
      </G>
      <G clipPath="url(#icon-auto-service_svg__c)">
        <Path
          fill="#fff"
          d="M8.625 8.263a2.1 2.1 0 0 1 .779-.92C9.749 7.12 10.153 7 10.566 7h5.368a2.11 2.11 0 0 1 1.939 1.262l.668 1.54a.68.68 0 0 0 .32.337c.423.209.722.596.815 1.052l.283 1.399q.04.201.041.408v.345c0 .678-.33 1.285-.844 1.664v1.576c0 .11-.044.217-.123.295a.43.43 0 0 1-.299.122h-1.687a.43.43 0 0 1-.298-.122.41.41 0 0 1-.124-.295v-1.115a97 97 0 0 1-3.375.074 97 97 0 0 1-3.375-.074v1.115c0 .11-.044.217-.124.295a.43.43 0 0 1-.298.122H7.766a.43.43 0 0 1-.299-.122.41.41 0 0 1-.123-.295v-1.576a2.06 2.06 0 0 1-.844-1.665v-.344q0-.206.041-.408l.283-1.4c.093-.455.392-.843.813-1.05a.68.68 0 0 0 .322-.338l.668-1.54zm.405 5.404a.85.85 0 0 0 .597-.244.83.83 0 0 0 0-1.179.85.85 0 0 0-1.193 0 .83.83 0 0 0 0 1.179.85.85 0 0 0 .596.244m8.438 0a.85.85 0 0 0 .596-.244.83.83 0 0 0 0-1.179.85.85 0 0 0-1.193 0 .83.83 0 0 0 0 1.179.85.85 0 0 0 .597.244M11.562 12a.85.85 0 0 0-.597.244.83.83 0 0 0 0 1.179.85.85 0 0 0 .597.244h3.375a.85.85 0 0 0 .596-.244.83.83 0 0 0 0-1.179.85.85 0 0 0-.596-.244zm-2.61-2.342a.42.42 0 0 0 .2.568.44.44 0 0 0 .218.04c.768-.06 2.827-.141 3.88-.141 1.051 0 3.11.08 3.878.142a.44.44 0 0 0 .388-.185.42.42 0 0 0 .031-.425l-.806-1.594a.42.42 0 0 0-.378-.23h-6.228a.43.43 0 0 0-.377.23z"
        />
      </G>
      <Path
        fill="#fff"
        stroke="#00B453"
        strokeWidth={0.613}
        d="M18.783 5.75v1.438l-.415.195-.414-.195V5.323l-.404.137c-1.001.34-1.384 1.205-1.355 2.013.026.707.373 1.452.97 1.793v7.043l.005.026c.057.327.219.582.447.749.225.164.496.23.757.221.514-.018 1.063-.34 1.23-.94l.012-.04v-7.09c.423-.311.691-.678.828-1.069.151-.429.137-.864.032-1.248a2.5 2.5 0 0 0-.534-.984c-.223-.248-.514-.454-.82-.488l-.34-.038z"
      />
      <Defs>
        <RadialGradient
          id="icon-auto-service_svg__b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(90 1 13)scale(10)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.724} stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.52} />
        </RadialGradient>
        <ClipPath id="icon-auto-service_svg__c">
          <Path fill="#fff" d="M6.5 7H19v10H6.5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconAutoService;
