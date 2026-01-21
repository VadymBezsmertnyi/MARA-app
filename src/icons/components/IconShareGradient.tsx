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

const SvgIconShareGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <Path
        fill="url(#icon-share-gradient_svg__a)"
        d="M18.5 22.5a2.9 2.9 0 0 1-2.125-.875A2.9 2.9 0 0 1 15.5 19.5q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588t-1.1.212a2.9 2.9 0 0 1-2.125-.875A2.9 2.9 0 0 1 3.5 12.5q0-1.25.875-2.125A2.9 2.9 0 0 1 6.5 9.5q.575 0 1.1.213t.95.587l7.05-4.1a2 2 0 0 1-.075-.337A3 3 0 0 1 15.5 5.5q0-1.25.875-2.125A2.9 2.9 0 0 1 18.5 2.5q1.25 0 2.125.875T21.5 5.5t-.875 2.125A2.9 2.9 0 0 1 18.5 8.5q-.575 0-1.1-.212a3.3 3.3 0 0 1-.95-.588L9.4 11.8q.05.15.075.338a2.8 2.8 0 0 1 0 .725 2 2 0 0 1-.075.337l7.05 4.1q.425-.375.95-.587t1.1-.213q1.25 0 2.125.875T21.5 19.5t-.875 2.125a2.9 2.9 0 0 1-2.125.875m0-16a.97.97 0 0 0 .713-.287.96.96 0 0 0 .287-.713.97.97 0 0 0-.288-.712.97.97 0 0 0-.712-.288.97.97 0 0 0-.712.288.97.97 0 0 0-.288.712q0 .425.288.713t.712.287m-12 7a.97.97 0 0 0 .713-.288.96.96 0 0 0 .287-.712.97.97 0 0 0-.288-.712.97.97 0 0 0-.712-.288.97.97 0 0 0-.712.288.97.97 0 0 0-.288.712q0 .425.288.713.289.288.712.287m12 7a.97.97 0 0 0 .713-.288.96.96 0 0 0 .287-.712.97.97 0 0 0-.288-.712.97.97 0 0 0-.712-.288.97.97 0 0 0-.712.288.97.97 0 0 0-.288.712q0 .425.288.713t.712.287"
      />
      <Defs>
        <LinearGradient
          id="icon-share-gradient_svg__a"
          x1={12.526}
          x2={-14.4}
          y1={-18.462}
          y2={4.154}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconShareGradient;
