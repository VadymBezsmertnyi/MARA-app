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

const SvgIconTabWorkshopsSelect = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M14 7A7 7 0 0 1 23.033.3a1 1 0 0 1 .418 1.664l-4.427 4.425a3 3 0 0 0 2.588 2.586l4.424-4.426a1 1 0 0 1 1.664.418 7 7 0 0 1-7.296 9.008c-1.357-.115-2.493.133-3.079.845L7.792 26.4A4.397 4.397 0 1 1 1.6 20.21l11.579-9.535c.71-.587.96-1.722.845-3.08A7 7 0 0 1 14 7M3.49 23.5a1 1 0 0 1 1-1h.01a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        d="M11.435 9.52 8.5 6.586V4.498a1 1 0 0 0-.485-.857l-5-3a1 1 0 0 0-1.222.15l-1 1a1 1 0 0 0-.15 1.222l3 5a1 1 0 0 0 .857.485h2.085l2.75 2.75 2.1-1.73z"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m14.741 21.106 5.578 5.576a4.5 4.5 0 0 0 6.364-6.364l-4.408-4.407a9 9 0 0 1-2.04.057c-.526-.045-.91-.008-1.157.056a.8.8 0 0 0-.222.084zm4.552-1.814a1 1 0 0 1 1.413 0l2.5 2.502a1 1 0 1 1-1.413 1.413l-2.5-2.5a1 1 0 0 1 0-1.413z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SvgIconTabWorkshopsSelect;
