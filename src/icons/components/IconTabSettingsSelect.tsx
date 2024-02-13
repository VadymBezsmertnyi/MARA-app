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

const SvgIconTabSettingsSelect = (originalProps: IconType) => {
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
        d="M10.305 16.494a15.975 15.975 0 0 0-5.619 3.773 16.646 16.646 0 0 0-3.468 5.383A17.127 17.127 0 0 0 0 32h32c0-2.18-.414-4.337-1.218-6.35a16.645 16.645 0 0 0-3.468-5.383 15.976 15.976 0 0 0-5.62-3.773c-1.45 1.524-3.466 2.469-5.694 2.469-2.229 0-4.244-.945-5.695-2.47"
        clipRule="evenodd"
      />
      <Ellipse cx={16} cy={8.296} fill="#fff" rx={8} ry={8.296} />
    </Svg>
  );
};

export default SvgIconTabSettingsSelect;
