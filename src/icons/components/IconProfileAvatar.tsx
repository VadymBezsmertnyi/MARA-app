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

const SvgIconProfileAvatar = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44" {...props}>
      <Path
        fill="#5ECBE3"
        d="M22.09 24.335c6.59 0 11.933-5.224 11.933-11.667C34.023 6.224 28.68 1 22.09 1 15.5 1 10.159 6.224 10.159 12.668c0 6.444 5.342 11.667 11.932 11.667ZM41.16 36.02c.011-.167.011-.333 0-.5a4.469 4.469 0 0 0-.517-1.764c-1.16-2.244-4.412-3.26-7.125-3.835a40.426 40.426 0 0 0-5.883-.768L25.564 29H18.605l-2.072.153a40.43 40.43 0 0 0-5.882.768c-2.713.498-5.965 1.534-7.125 3.835a4.467 4.467 0 0 0-.518 1.765c-.01.166-.01.332 0 .498-.01.166-.01.333 0 .499.056.608.24 1.2.539 1.745 1.16 2.244 4.411 3.26 7.125 3.836 1.94.38 3.905.636 5.882.767l2.071.134h6.96l2.071-.134a46.483 46.483 0 0 0 5.882-.767c2.714-.518 5.966-1.535 7.126-3.836.285-.561.46-1.165.517-1.783a3.725 3.725 0 0 0-.02-.46Z"
      />
    </Svg>
  );
};

export default SvgIconProfileAvatar;
