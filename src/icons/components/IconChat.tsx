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

const SvgIconChat = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 12" {...props}>
      <Path
        fill="url(#icon_chat_svg__a)"
        d="M5.825.7C3.194.7 1 2.341 1 4.42c0 1.064.642 1.99 1.553 2.667-.059.36-.22.7-.467.985a6.497 6.497 0 0 1-.317.342 1.118 1.118 0 0 0-.15.177c-.028.041-.071.087-.091.178a.487.487 0 0 0 .09.356l.06.096.121.054c.422.192.878.158 1.297.055.418-.103.82-.28 1.206-.465.385-.185.751-.378 1.04-.52.041-.02.067-.024.106-.04.761.948 2.154 1.586 3.71 1.586h.044c.628 0 2.654 1.879 3.86 1.135.049-.175-1.06-.613-1.116-1.915.945-.605 1.554-1.505 1.554-2.503 0-1.475-1.291-2.695-3.016-3.131C9.94 1.867 8.042.7 5.825.7Zm0 .875c2.194 0 3.86 1.335 3.86 2.845 0 1.51-1.666 2.845-3.86 2.845-.392 0-.617.145-.935.3-.319.156-.684.35-1.04.52a5.932 5.932 0 0 1-.875.342c.264-.346.54-.8.588-1.436l.015-.246-.226-.15c-.86-.547-1.387-1.333-1.387-2.175 0-1.51 1.666-2.845 3.86-2.845Z"
      />
      <Defs>
        <LinearGradient
          id="icon_chat_svg__a"
          x1={7.268}
          x2={-7.005}
          y1={-10.305}
          y2={5.552}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconChat;
