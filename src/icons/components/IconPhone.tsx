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

const SvgIconPhone = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30"
      {...props}
    >
      <G clipPath="url(#icon-phone_svg__a)">
        <Path d="m27.671 19.883-6.625-2.969-.018-.008a2.25 2.25 0 0 0-2.133.197q-.055.036-.106.078L15.366 20.1c-2.168-1.053-4.407-3.275-5.46-5.415l2.922-3.475q.042-.052.08-.108a2.25 2.25 0 0 0 .186-2.118v-.017L10.117 2.33A2.25 2.25 0 0 0 7.78.991 7.91 7.91 0 0 0 .9 8.85C.9 20.015 9.985 29.1 21.15 29.1a7.91 7.91 0 0 0 7.859-6.88 2.25 2.25 0 0 0-1.338-2.336m-6.52 6.966a18.02 18.02 0 0 1-18-18 5.65 5.65 0 0 1 4.903-5.625v.017l2.953 6.61L8.1 13.33a1 1 0 0 0-.08.108 2.25 2.25 0 0 0-.14 2.208c1.274 2.605 3.9 5.211 6.533 6.484a2.25 2.25 0 0 0 2.215-.16q.054-.037.104-.08l3.419-2.916 6.609 2.96h.015a5.654 5.654 0 0 1-5.625 4.915" />
      </G>
      <Defs>
        <ClipPath id="icon-phone_svg__a">
          <Path d="M0 0h30v30H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconPhone;
