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

const SvgIconPhoneGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <G clipPath="url(#icon-phone-gradient_svg__a)">
        <Path
          stroke="url(#icon-phone-gradient_svg__b)"
          strokeWidth={1.853}
          d="m16.905 16.234-.562-.737c.562.736.561.737.56.738l-.002.002-.004.003-.009.006-.02.015a1.2 1.2 0 0 1-.184.108 2 2 0 0 1-.416.146c-.348.08-.794.09-1.326-.064-1.04-.301-2.353-1.209-3.981-3.312S8.786 9.541 8.76 8.46c-.014-.553.11-.982.28-1.298a1.9 1.9 0 0 1 .358-.474l.045-.04.019-.015.009-.007.004-.003.001-.001.396-.305.003-.002c.593-.453.78-1.31.371-2.035L8.971 2.018C8.457 1.106 7.308.89 6.572 1.452l-2.17 1.66H4.4c-.457.35-.708.768-.74 1.195zm0 0 .001-.001m0 0 .63-.482zm1.729 5.616c.368.014.753-.127 1.132-.418h.001l1.965-1.504c.8-.61.811-1.911-.12-2.587l-2.174-1.578c-.6-.435-1.371-.418-1.903-.011zm0 0c-1.797-.065-6.373-.812-10.704-6.406zM7.93 15.443C3.804 10.11 3.535 6.04 3.66 4.307z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="icon-phone-gradient_svg__b"
          x1={17.233}
          x2={-14.894}
          y1={-20.733}
          y2={3.681}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <ClipPath id="icon-phone-gradient_svg__a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconPhoneGradient;
