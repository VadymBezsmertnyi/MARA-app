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

const SvgIconMapCustom = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 23"
      {...props}
    >
      <Path d="m9.244 22.064-7.349-2.94v-15.8l7.717 3.307m-.368 15.433 7.716-2.94m-7.716 2.94L9.612 6.63m7.348 12.493 8.084 2.94V6.63L16.96 3.324m0 15.8v-15.8m0 0L9.612 6.631" />
      <Path d="M7.732 2.597c0 .442-.126.873-.363 1.244l-.279.438h.004L5.436 6.89 3.78 4.28h.003l-.278-.437a2.31 2.31 0 0 1-.188-2.13A2.31 2.31 0 0 1 4.559.46a2.28 2.28 0 0 1 2.5.501 2.31 2.31 0 0 1 .673 1.636m-3.28.988a1.387 1.387 0 0 0 1.968 0 1.4 1.4 0 0 0 0-1.975 1.387 1.387 0 0 0-1.968 0 1.4 1.4 0 0 0 0 1.975M16.61 10.966c0 .44-.126.873-.362 1.244l-.28.437h.005l-1.658 2.611-1.658-2.61h.003l-.278-.438a2.31 2.31 0 0 1-.188-2.13 2.31 2.31 0 0 1 1.243-1.251 2.28 2.28 0 0 1 2.5.5 2.31 2.31 0 0 1 .673 1.636m-3.28.987a1.387 1.387 0 0 0 2.375-.987c0-.37-.146-.726-.406-.988a1.387 1.387 0 0 0-1.968 0 1.4 1.4 0 0 0 0 1.975" />
    </Svg>
  );
};

export default SvgIconMapCustom;
