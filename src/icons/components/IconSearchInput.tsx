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

const SvgIconSearchInput = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 26 26"
      {...props}
    >
      <Path
        fill="#E6E6E6"
        d="M10.618 21.035c2.292 0 4.432-.738 6.172-1.97l6.545 6.484c.304.3.704.451 1.118.451.898 0 1.547-.684 1.547-1.56a1.5 1.5 0 0 0-.442-1.093l-6.503-6.456a10.412 10.412 0 0 0 2.181-6.373C21.236 4.732 16.46 0 10.618 0 4.764 0 0 4.732 0 10.518c0 5.785 4.764 10.517 10.618 10.517m0-2.27c-4.57 0-8.326-3.734-8.326-8.247 0-4.514 3.756-8.248 8.326-8.248 4.557 0 8.326 3.734 8.326 8.248 0 4.513-3.77 8.247-8.326 8.247"
      />
    </Svg>
  );
};

export default SvgIconSearchInput;
