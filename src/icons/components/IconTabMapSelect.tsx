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

const SvgIconTabMapSelect = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 36 32"
      {...props}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M24.317 27.11 35.012 31V9.317l-10.976-4.49zm-1.28-22.162L13.835 9.09l-.505 21.714 9.986-3.804zM2.487 4.67l10.348 4.435-.505 21.702-9.842-3.937z"
        clipRule="evenodd"
      />
      <Path
        fill="url(#icon-tab-map-select_svg__a)"
        stroke="#fff"
        strokeWidth={0.8}
        d="M11.156 3.778c0 .644-.185 1.274-.533 1.816l-.395.616h.005l-2.455 3.842L5.322 6.21h.005l-.394-.616a3.358 3.358 0 0 1-.276-3.109 3.378 3.378 0 0 1 6.499 1.293ZM6.35 5.206A2.02 2.02 0 1 0 9.206 2.35 2.02 2.02 0 0 0 6.35 5.206Z"
      />
      <Circle cx={21} cy={16} r={2} fill="url(#icon-tab-map-select_svg__b)" />
      <Path
        fill="url(#icon-tab-map-select_svg__c)"
        stroke="#fff"
        strokeWidth={0.8}
        d="M24.156 15.95c0 .644-.185 1.274-.532 1.816l-.396.616h.005l-2.455 3.842-2.455-3.842h.004l-.394-.615a3.358 3.358 0 0 1-.276-3.11 3.378 3.378 0 0 1 6.499 1.293Zm-4.806 1.428a2.02 2.02 0 1 0 2.856-2.855 2.02 2.02 0 0 0-2.856 2.855Z"
      />
      <Defs>
        <LinearGradient
          id="icon-tab-map-select_svg__a"
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
          id="icon-tab-map-select_svg__b"
          x1={21.006}
          x2={15.551}
          y1={9.808}
          y2={14.898}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-tab-map-select_svg__c"
          x1={20.789}
          x2={7.278}
          y1={0.859}
          y2={9.685}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconTabMapSelect;
