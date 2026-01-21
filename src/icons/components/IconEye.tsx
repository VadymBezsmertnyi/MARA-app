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

const SvgIconEye = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 11"
      {...props}
    >
      <Path
        fill="#A9A4A0"
        d="M16 5.5S13 .458 8 .458 0 5.5 0 5.5s3 5.042 8 5.042S16 5.5 16 5.5m-14.827 0a12.2 12.2 0 0 1 1.66-1.873C4.12 2.446 5.88 1.375 8 1.375s3.879 1.07 5.168 2.252a12.2 12.2 0 0 1 1.66 1.873q-.086.12-.195.264c-.335.44-.83 1.027-1.465 1.609C11.879 8.555 10.119 9.625 8 9.625s-3.879-1.07-5.168-2.252A12 12 0 0 1 1.173 5.5"
      />
      <Path
        fill="#A9A4A0"
        d="M8 3.209a2.62 2.62 0 0 0-1.768.67A2.2 2.2 0 0 0 5.5 5.5a2.2 2.2 0 0 0 .732 1.62A2.62 2.62 0 0 0 8 7.793a2.62 2.62 0 0 0 1.768-.671A2.2 2.2 0 0 0 10.5 5.5a2.2 2.2 0 0 0-.732-1.621A2.62 2.62 0 0 0 8 3.209M4.5 5.5c0-.85.369-1.667 1.025-2.268A3.67 3.67 0 0 1 8 2.292c.928 0 1.819.338 2.475.94S11.5 4.649 11.5 5.5s-.369 1.667-1.025 2.269A3.67 3.67 0 0 1 8 8.709a3.67 3.67 0 0 1-2.475-.94C4.87 7.167 4.5 6.351 4.5 5.5"
      />
    </Svg>
  );
};

export default SvgIconEye;
