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

const SvgIconProfileAvatar = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 44 44"
      {...props}
    >
      <Path
        fill="#5ECBE3"
        d="M22.09 24.335c6.59 0 11.933-5.224 11.933-11.667C34.023 6.224 28.68 1 22.09 1S10.159 6.224 10.159 12.668s5.342 11.667 11.932 11.667M41.16 36.02q.017-.25 0-.5a4.5 4.5 0 0 0-.517-1.764c-1.16-2.244-4.412-3.26-7.125-3.835a40.4 40.4 0 0 0-5.883-.768L25.564 29h-6.9590000000000005l-2.072.153a40.4 40.4 0 0 0-5.882.768c-2.713.498-5.965 1.534-7.125 3.835a4.5 4.5 0 0 0-.518 1.765q-.015.249 0 .498-.015.25 0 .499c.056.608.24 1.2.539 1.745 1.16 2.244 4.411 3.26 7.125 3.836 1.94.38 3.905.636 5.882.767l2.071.134h6.96l2.071-.134a46.5 46.5 0 0 0 5.882-.767c2.714-.518 5.966-1.535 7.126-3.836.285-.561.46-1.165.517-1.783a4 4 0 0 0-.02-.46"
      />
    </Svg>
  );
};

export default SvgIconProfileAvatar;
