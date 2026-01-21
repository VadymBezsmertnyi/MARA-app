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

const SvgSocialApple = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <G clipPath="url(#social-apple_svg__a)">
        <Path
          fill="#000"
          d="M21.792 18.704a13 13 0 0 1-1.29 2.32q-1.02 1.45-1.662 2.008-.995.915-2.137.941-.82.002-1.973-.471-1.155-.47-2.124-.47-1.018 0-2.185.47-1.168.473-1.888.496-1.095.047-2.184-.966-.696-.607-1.739-2.08-1.118-1.573-1.838-3.651Q2 15.055 2 12.948q0-2.413 1.044-4.158A6.1 6.1 0 0 1 5.23 6.58a5.9 5.9 0 0 1 2.955-.835q.869.002 2.285.532 1.415.532 1.813.534.3 0 2.01-.628 1.616-.581 2.733-.486 3.03.244 4.545 2.393-2.709 1.643-2.681 4.593.025 2.298 1.663 3.818.742.704 1.663 1.09-.2.58-.424 1.112M17.161.48q-.001 1.801-1.313 3.359c-1.054 1.233-2.33 1.945-3.714 1.833a4 4 0 0 1-.027-.455c0-1.152.501-2.385 1.392-3.394q.667-.766 1.696-1.273 1.028-.502 1.94-.55.027.24.026.48"
        />
      </G>
      <Defs>
        <ClipPath id="social-apple_svg__a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgSocialApple;
