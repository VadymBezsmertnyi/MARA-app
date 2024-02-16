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

const SvgIconTelegram = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 24"
      {...props}
    >
      <Path
        d="M23.72 1.537a1.875 1.875 0 0 1 2.578 2.033l-2.835 17.196c-.275 1.659-2.095 2.61-3.616 1.784-1.273-.691-3.163-1.756-4.863-2.867-.85-.557-3.454-2.338-3.134-3.605.275-1.084 4.65-5.157 7.15-7.578.982-.951.534-1.5-.625-.625-2.877 2.172-7.497 5.476-9.025 6.406-1.347.82-2.05.96-2.89.82-1.532-.255-2.953-.65-4.113-1.131-1.568-.65-1.492-2.805-.002-3.433z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SvgIconTelegram;
