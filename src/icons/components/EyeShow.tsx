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

const SvgEyeShow = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <G stroke="#524B44" strokeWidth={2}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20a10.07 10.07 0 0 0 5.94-2.06c.707-.585 2.276-1.955 2.9-2.75A18.5 18.5 0 0 0 23 12s-4-8-11-8a9 9 0 0 0-2.1.24c-1.28.182-3.093 1.29-3.84 1.82A18.45 18.45 0 0 0 1 12s4 8 11 8"
        />
        <Circle cx={12} cy={12} r={3} />
      </G>
    </Svg>
  );
};

export default SvgEyeShow;
