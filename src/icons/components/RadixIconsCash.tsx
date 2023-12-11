import React from 'react';
import { IconType } from '../icon.types';
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
} from 'react-native-svg';

const SvgRadixIconsCash = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="url(#radix-icons_cash_svg__a)"
        d="M12 12.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM10.5 16a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      />
      <Path
        fill="url(#radix-icons_cash_svg__b)"
        d="M17.526 5.116 14.347.66 2.658 9.997 2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599-2.098.715ZM19.425 10H9.397l7.469-2.546 1.522-.487L19.425 10ZM15.55 5.79 7.84 8.418l6.106-4.878 1.604 2.25ZM3.5 18.17v-4.34A3.008 3.008 0 0 0 5.33 12h13.34a3.01 3.01 0 0 0 1.83 1.83v4.34A3.008 3.008 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.17Z"
      />
      <Defs>
        <LinearGradient
          id="radix-icons_cash_svg__a"
          x1={12.01}
          x2={2.465}
          y1={5.163}
          y2={14.071}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="radix-icons_cash_svg__b"
          x1={12.031}
          x2={-17.034}
          y1={-21.708}
          y2={4.982}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgRadixIconsCash;
