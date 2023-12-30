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

const SvgIconMapGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 41 32"
      {...props}
    >
      <G clipPath="url(#icon-map-gradient_svg__a)">
        <Path
          stroke="url(#icon-map-gradient_svg__b)"
          strokeLinecap="round"
          strokeWidth={1.8}
          d="M12.813 31 2.487 26.87V4.67L13.33 9.316M12.813 31l10.841-4.13M12.813 31l.516-21.684M23.654 26.87 35.012 31V9.317L23.654 4.67m0 22.2V4.67m0 0L13.33 9.316"
        />
        <Path
          fill="url(#icon-map-gradient_svg__c)"
          stroke="url(#icon-map-gradient_svg__d)"
          strokeWidth={0.8}
          d="M11.156 3.778c0 .644-.185 1.274-.533 1.816l-.395.616h.005l-2.455 3.842L5.322 6.21h.005l-.394-.616a3.358 3.358 0 0 1-.276-3.109 3.378 3.378 0 0 1 6.499 1.293ZM6.35 5.206A2.02 2.02 0 1 0 9.206 2.35 2.02 2.02 0 0 0 6.35 5.206Z"
        />
        <Path
          fill="url(#icon-map-gradient_svg__e)"
          stroke="url(#icon-map-gradient_svg__f)"
          strokeWidth={0.8}
          d="M24.156 15.95c0 .644-.185 1.274-.532 1.816l-.396.616h.005l-2.455 3.841-2.455-3.841h.004l-.394-.616a3.358 3.358 0 0 1-.276-3.109 3.377 3.377 0 0 1 6.499 1.293Zm-4.806 1.428a2.02 2.02 0 1 0 2.856-2.856 2.02 2.02 0 0 0-2.856 2.856Z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="icon-map-gradient_svg__b"
          x1={18.797}
          x2={-16.831}
          y1={-22.925}
          y2={18.146}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-map-gradient_svg__c"
          x1={7.789}
          x2={-5.722}
          y1={-11.313}
          y2={-2.487}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-map-gradient_svg__d"
          x1={7.789}
          x2={-5.722}
          y1={-11.313}
          y2={-2.487}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-map-gradient_svg__e"
          x1={20.789}
          x2={7.278}
          y1={0.859}
          y2={9.685}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-map-gradient_svg__f"
          x1={20.789}
          x2={7.278}
          y1={0.859}
          y2={9.685}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <ClipPath id="icon-map-gradient_svg__a">
          <Path fill="#fff" d="M0 0h41v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconMapGradient;
