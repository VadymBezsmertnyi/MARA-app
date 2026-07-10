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

const SvgIconFilter = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        fill="url(#icon-filter_svg__a)"
        d="M12 10v7.88c.04.3-.06.62-.29.83a.997.997 0 0 1-1.41 0L8.29 16.7a.99.99 0 0 1-.29-.83V10h-.03L2.21 2.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L12.03 10z"
      />
      <Defs>
        <LinearGradient
          id="icon-filter_svg__a"
          x1={10.024}
          x2={-14.16}
          y1={-17.868}
          y2={2.193}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconFilter;
