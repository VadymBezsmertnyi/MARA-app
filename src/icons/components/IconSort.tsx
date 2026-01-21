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

const SvgIconSort = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Path
        fill="url(#icon-sort_svg__a)"
        fillRule="evenodd"
        d="M8.533 7.571a.83.83 0 0 0 .592.269.82.82 0 0 0 .6-.247.85.85 0 0 0 .243-.612.86.86 0 0 0-.264-.602L6.112 2.72l-.585-.596-.586.596-3.592 3.657a.85.85 0 0 0 .01 1.182.82.82 0 0 0 1.161.011l2.178-2.216V17.03c0 .224.087.439.242.597a.82.82 0 0 0 1.173 0 .85.85 0 0 0 .243-.597V5.355z"
        clipRule="evenodd"
      />
      <Path
        fill="url(#icon-sort_svg__b)"
        fillRule="evenodd"
        d="M11.488 12.429a.83.83 0 0 0-.592-.268.82.82 0 0 0-.601.247.85.85 0 0 0-.243.611.86.86 0 0 0 .264.602l3.592 3.658.586.596.586-.596 3.592-3.656a.85.85 0 0 0-.01-1.183.82.82 0 0 0-1.162-.011l-2.177 2.216V2.97a.85.85 0 0 0-.243-.597.82.82 0 0 0-1.172 0 .85.85 0 0 0-.243.597v11.676z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="icon-sort_svg__a"
          x1={5.555}
          x2={-12.156}
          y1={-14.382}
          y2={-5.092}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-sort_svg__b"
          x1={14.466}
          x2={32.177}
          y1={34.382}
          y2={25.092}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconSort;
