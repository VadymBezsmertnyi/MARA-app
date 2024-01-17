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

const SvgIconAvatarEmpty = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      {...props}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12.882 20.618a19.967 19.967 0 0 0-7.024 4.717 20.807 20.807 0 0 0-4.336 6.728A21.409 21.409 0 0 0 0 40h40c0-2.724-.517-5.42-1.523-7.937a20.807 20.807 0 0 0-4.335-6.729 19.967 19.967 0 0 0-7.024-4.717c-1.813 1.906-4.333 3.087-7.118 3.087-2.786 0-5.305-1.181-7.118-3.087"
        clipRule="evenodd"
      />
      <Ellipse cx={20} cy={10.37} fill="#fff" rx={10} ry={10.37} />
    </Svg>
  );
};

export default SvgIconAvatarEmpty;
