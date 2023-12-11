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

const SvgRadixIconsCalendar = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="url(#radix-icons_calendar_svg__a)"
        fillRule="evenodd"
        d="M7.2 1.6a.8.8 0 0 1 .8.8v.8h8v-.8a.8.8 0 0 1 1.6 0v.8H20a2.4 2.4 0 0 1 2.4 2.4V20a2.4 2.4 0 0 1-2.4 2.4H4A2.4 2.4 0 0 1 1.6 20V5.6A2.4 2.4 0 0 1 4 3.2h2.4v-.8a.8.8 0 0 1 .8-.8ZM16 4.8v.8a.8.8 0 0 0 1.6 0v-.8H20a.8.8 0 0 1 .8.8V8H3.2V5.6a.8.8 0 0 1 .8-.8h2.4v.8a.8.8 0 1 0 1.6 0v-.8h8ZM3.2 9.6V20a.8.8 0 0 0 .8.8h16a.8.8 0 0 0 .8-.8V9.6H3.2Zm8 2.4a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm4-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm2.4.8a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm.8 2.4a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm-4 .8a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm-2.4-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm-4 .8a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm-2.4-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm-.8 4a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm4-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm2.4.8a.8.8 0 1 1 1.6 0 .8.8 0 0 1-1.6 0Zm4-.8a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="radix-icons_calendar_svg__a"
          x1={12.03}
          x2={-16.333}
          y1={-20.2}
          y2={6.268}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgRadixIconsCalendar;
