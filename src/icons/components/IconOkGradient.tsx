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

const SvgIconOkGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <G filter="url(#icon-ok-gradient_svg__a)">
        <Circle cx={20} cy={20} r={8} fill="url(#icon-ok-gradient_svg__b)" />
      </G>
      <Path
        fill="#fff"
        d="M24.462 15.322a.735.735 0 0 0-1.027.223l-4.16 6.534-2.029-1.912a.741.741 0 0 0-.533-.2.736.736 0 0 0-.516.242.765.765 0 0 0 .041 1.07l2.664 2.509s.077.067.112.09a.734.734 0 0 0 1.027-.223l4.64-7.287a.764.764 0 0 0-.22-1.046"
      />
      <Defs>
        <LinearGradient
          id="icon-ok-gradient_svg__b"
          x1={20.023}
          x2={-1.795}
          y1={-4.769}
          y2={15.591}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconOkGradient;
