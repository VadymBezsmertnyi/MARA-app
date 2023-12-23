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
        d="M8.533 7.571a.83.83 0 0 0 .592.269.816.816 0 0 0 .6-.247.845.845 0 0 0 .243-.612.857.857 0 0 0-.264-.602L6.112 2.72l-.585-.596-.586.596-3.592 3.657a.852.852 0 0 0 .01 1.182.822.822 0 0 0 1.161.011l2.178-2.216V17.03c0 .224.087.439.242.597a.822.822 0 0 0 1.173 0 .852.852 0 0 0 .243-.597V5.355z"
        clipRule="evenodd"
      />
      <Path
        fill="url(#icon-sort_svg__b)"
        fillRule="evenodd"
        d="M11.488 12.429a.83.83 0 0 0-.592-.268.817.817 0 0 0-.601.247.845.845 0 0 0-.243.611.855.855 0 0 0 .264.602l3.592 3.658.586.596.586-.596 3.592-3.656a.852.852 0 0 0-.01-1.183.822.822 0 0 0-1.162-.011l-2.177 2.216V2.97a.852.852 0 0 0-.243-.597.822.822 0 0 0-1.172 0 .851.851 0 0 0-.243.597v11.676z"
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
