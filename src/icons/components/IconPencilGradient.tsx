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

const SvgIconPencilGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="url(#icon-pencil-gradient_svg__a)"
        d="M16.035 3.015a3 3 0 0 1 4.099-.135l.144.135.707.707a3 3 0 0 1 .135 4.098l-.135.144L9.773 19.177a1.5 1.5 0 0 1-.562.354l-.162.047-4.454 1.028a1.002 1.002 0 0 1-1.22-1.088l.02-.113 1.027-4.455a1.5 1.5 0 0 1 .29-.598l.111-.125zm-.707 3.535-8.99 8.99-.636 2.758 2.758-.637 8.99-8.99zm3.536-2.12a1 1 0 0 0-1.32-.084l-.094.083-.708.707 2.122 2.121.707-.707a1 1 0 0 0 .083-1.32l-.083-.094z"
      />
      <Defs>
        <LinearGradient
          id="icon-pencil-gradient_svg__a"
          x1={12.643}
          x2={-12.578}
          y1={-17.249}
          y2={6.287}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconPencilGradient;
