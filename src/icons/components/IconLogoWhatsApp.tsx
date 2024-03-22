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

const SvgIconLogoWhatsApp = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 19"
      {...props}
    >
      <G clipPath="url(#icon-logo-whatsApp_svg__a)">
        <Path
          fill="url(#icon-logo-whatsApp_svg__b)"
          d="M.384 9.392c0 1.513.398 2.99 1.155 4.29L.312 18.13l4.586-1.193a8.702 8.702 0 0 0 4.135 1.044h.004c4.768 0 8.65-3.85 8.651-8.582a8.495 8.495 0 0 0-2.532-6.072A8.632 8.632 0 0 0 9.036.811C4.267.81.386 4.66.384 9.392"
        />
        <Path
          fill="#60D669"
          d="M.075 9.39c0 1.566.412 3.096 1.197 4.444L0 18.441l4.751-1.237a9.014 9.014 0 0 0 4.283 1.083h.004c4.939 0 8.96-3.989 8.962-8.89 0-2.376-.93-4.61-2.623-6.29A8.942 8.942 0 0 0 9.037.5C4.098.5.078 4.488.076 9.39m2.83 4.212-.178-.28A7.327 7.327 0 0 1 1.59 9.39C1.59 5.316 4.932 2.001 9.04 2.001c1.99.001 3.86.77 5.266 2.167a7.316 7.316 0 0 1 2.18 5.228c-.002 4.074-3.344 7.39-7.45 7.39h-.002a7.485 7.485 0 0 1-3.792-1.031l-.272-.16-2.82.733z"
        />
        <Path
          fill="#fff"
          d="M6.798 5.673c-.168-.37-.345-.377-.504-.384-.13-.005-.28-.005-.43-.005a.826.826 0 0 0-.596.278c-.206.223-.784.76-.784 1.853s.802 2.15.914 2.298c.112.148 1.55 2.464 3.825 3.354 1.892.74 2.277.593 2.688.556.41-.037 1.325-.537 1.511-1.056.187-.519.187-.964.13-1.056-.055-.093-.204-.149-.428-.26-.225-.11-1.325-.648-1.53-.723-.206-.074-.355-.11-.505.112-.149.222-.578.722-.709.87-.13.149-.26.168-.485.056-.224-.111-.945-.345-1.8-1.102-.666-.59-1.116-1.317-1.246-1.54-.131-.221-.014-.342.098-.452.1-.1.224-.26.336-.39.112-.13.149-.222.224-.37.074-.148.037-.278-.019-.39-.056-.11-.491-1.21-.69-1.649"
        />
      </G>
      <Defs>
        <LinearGradient
          id="icon-logo-whatsApp_svg__b"
          x1={869.139}
          x2={869.139}
          y1={1732.75}
          y2={0.811}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1FAF38" />
          <Stop offset={1} stopColor="#60D669" />
        </LinearGradient>
        <ClipPath id="icon-logo-whatsApp_svg__a">
          <Path fill="#fff" d="M0 .5h18v18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconLogoWhatsApp;
