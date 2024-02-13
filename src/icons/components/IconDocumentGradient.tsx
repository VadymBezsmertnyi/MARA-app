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

const SvgIconDocumentGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <Path
        fill="url(#icon-document-gradient_svg__a)"
        d="M16.25 13.5a.75.75 0 0 0-.75-.75h-6a.75.75 0 1 0 0 1.5h6a.75.75 0 0 0 .75-.75m0 4a.75.75 0 0 0-.75-.75h-6a.75.75 0 1 0 0 1.5h6a.75.75 0 0 0 .75-.75"
      />
      <Path
        fill="url(#icon-document-gradient_svg__b)"
        fillRule="evenodd"
        d="M7.5 2.75A2.75 2.75 0 0 0 4.75 5.5v14a2.75 2.75 0 0 0 2.75 2.75h10a2.75 2.75 0 0 0 2.75-2.75V8.468c0-.381-.124-.751-.354-1.055l-2.998-3.968a1.75 1.75 0 0 0-1.396-.695zM6.25 5.5c0-.69.56-1.25 1.25-1.25h7.25v4.397c0 .414.336.75.75.75h3.25V19.5c0 .69-.56 1.25-1.25 1.25h-10c-.69 0-1.25-.56-1.25-1.25z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="icon-document-gradient_svg__a"
          x1={12.511}
          x2={5.206}
          y1={6.986}
          y2={16.281}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-document-gradient_svg__b"
          x1={12.523}
          x2={-12.985}
          y1={-17.688}
          y2={1.233}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconDocumentGradient;
