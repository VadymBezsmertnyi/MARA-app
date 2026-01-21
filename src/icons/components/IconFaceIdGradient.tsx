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

const SvgIconFaceIdGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 110 110"
      {...props}
    >
      <Path
        fill="url(#icon-face-id-gradient_svg__a)"
        fillRule="evenodd"
        d="M5.586 30.186V17.832c0-6.753 5.494-12.246 12.246-12.246h12.354a2.793 2.793 0 0 0 0-5.586H17.832C7.999 0 0 8 0 17.832v12.354a2.793 2.793 0 0 0 5.586 0m24.6 74.228a2.793 2.793 0 0 1 0 5.586H17.832C7.999 110 0 102.001 0 92.168V79.814a2.793 2.793 0 0 1 5.586 0v12.354c0 6.752 5.494 12.246 12.246 12.246zM110 79.814v12.354c0 9.833-7.999 17.832-17.832 17.832H79.814a2.793 2.793 0 1 1 0-5.586h12.354c6.752 0 12.246-5.494 12.246-12.246V79.814a2.793 2.793 0 0 1 5.586 0m0-61.982v12.354a2.793 2.793 0 1 1-5.586 0V17.832c0-6.753-5.494-12.246-12.246-12.246H79.814a2.793 2.793 0 0 1 0-5.586h12.354C102.001 0 110 8 110 17.832M74.275 81.301a2.9 2.9 0 1 0-3.936-4.261A22.54 22.54 0 0 1 55 83.037a22.54 22.54 0 0 1-15.339-5.998 2.9 2.9 0 0 0-3.936 4.262A28.33 28.33 0 0 0 55 88.838 28.33 28.33 0 0 0 74.275 81.3M60.8 41.465V62.09c0 4.087-3.325 7.412-7.412 7.412h-2.364a2.9 2.9 0 1 1 0-5.8h2.364c.888 0 1.611-.724 1.611-1.612V41.465a2.9 2.9 0 0 1 5.8 0m19.98 8.11v-8.271a2.74 2.74 0 0 0-5.478 0v8.271a2.74 2.74 0 0 0 5.478 0m-50.918 0a2.74 2.74 0 0 0 5.479 0v-8.271a2.74 2.74 0 0 0-5.479 0z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="icon-face-id-gradient_svg__a"
          x1={55.16}
          x2={-94.838}
          y1={-115.288}
          y2={24.69}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconFaceIdGradient;
