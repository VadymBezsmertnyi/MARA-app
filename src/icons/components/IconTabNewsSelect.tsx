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

const SvgIconTabNewsSelect = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.636}
        d="m23.758 8.45 5.172-3.103m-6.034 0L24.62.914m.862 10.409 5.604.673"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m23.228 17.552-7.383-13.29.738-2.428a.409.409 0 0 1 .748-.08l8.946 16c.18.323-.125.7-.478.591zM15.44 5.593l6.474 11.653-2.659-.342a.818.818 0 0 0-.455.072l-3.979 1.889-4.415-7.85 4.07-2.846a.818.818 0 0 0 .313-.432zm-5.858 5.998L4.24 15.327a.408.408 0 0 0-.154.207l3.922 6.536a.406.406 0 0 0 .142-.039l.954-.452.108.197 3.4-1.7-.06-.1-3.448 1.603 4.812-2.284zm3.541 9.347-3.427 1.714 3.913 7.092a.457.457 0 0 0 .647.163l2.666-1.713a.457.457 0 0 0 .146-.618zM1.268 18.883 3.98 17.3l2.64 4.4-2.765 1.617a.41.41 0 0 1-.56-.147L1.12 19.443a.409.409 0 0 1 .147-.56"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SvgIconTabNewsSelect;
