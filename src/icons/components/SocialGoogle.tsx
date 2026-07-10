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

const SvgSocialGoogle = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
      <Path
        fill="#4285F4"
        d="M12.245 9.818v4.647h6.59c-.29 1.495-1.158 2.76-2.46 3.611l3.974 3.022C22.664 19.004 24 15.928 24 12.273c0-.851-.078-1.67-.223-2.455z"
      />
      <Path
        fill="#34A853"
        d="m5.382 14.284-.896.672-3.173 2.422A12.27 12.27 0 0 0 12.244 24c3.307 0 6.078-1.07 8.104-2.902l-3.974-3.022c-1.09.72-2.482 1.157-4.13 1.157-3.183 0-5.888-2.106-6.857-4.942z"
      />
      <Path
        fill="#FBBC05"
        d="M1.313 6.622a11.66 11.66 0 0 0 0 10.756c0 .011 4.075-3.098 4.075-3.098a7 7 0 0 1-.39-2.28c0-.797.145-1.56.39-2.28z"
      />
      <Path
        fill="#EA4335"
        d="M12.245 4.778c1.803 0 3.406.611 4.686 1.79l3.507-3.437C18.312 1.189 15.55 0 12.245 0 7.458 0 3.328 2.695 1.313 6.622L5.388 9.72c.968-2.836 3.673-4.942 6.857-4.942"
      />
    </Svg>
  );
};

export default SvgSocialGoogle;
