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

const SvgIconLogoTelegram = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 19"
      {...props}
    >
      <G clipPath="url(#icon-logo-telegram_svg__a)">
        <Path
          fill="url(#icon-logo-telegram_svg__b)"
          d="M9 .5a8.999 8.999 0 1 0 0 17.998A8.999 8.999 0 0 0 9 .5"
        />
        <Path
          fill="#fff"
          d="M4.074 9.405a438 438 0 0 1 5.248-2.261c2.5-1.04 3.02-1.22 3.358-1.226a.6.6 0 0 1 .349.104c.09.074.115.174.128.244.011.07.027.23.014.354-.135 1.423-.722 4.877-1.02 6.47-.125.675-.374.901-.614.924-.523.048-.92-.346-1.426-.678-.792-.519-1.24-.842-2.008-1.349-.889-.585-.312-.907.194-1.433.132-.138 2.435-2.232 2.479-2.422.006-.024.011-.113-.042-.16-.052-.046-.13-.03-.186-.018q-.119.027-3.797 2.51-.537.37-.976.36c-.32-.007-.939-.181-1.399-.33-.562-.184-1.01-.281-.972-.592q.03-.243.67-.497"
        />
      </G>
      <Defs>
        <LinearGradient
          id="icon-logo-telegram_svg__b"
          x1={900}
          x2={900}
          y1={0.5}
          y2={1800.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AABEE" />
          <Stop offset={1} stopColor="#229ED9" />
        </LinearGradient>
        <ClipPath id="icon-logo-telegram_svg__a">
          <Path fill="#fff" d="M0 .5h18v18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconLogoTelegram;
