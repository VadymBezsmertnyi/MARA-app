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

const SvgIconEventMap = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 26 29"
      {...props}
    >
      <Path
        fill="#02B8C3"
        d="M22.667 9.333A9.332 9.332 0 1 0 4 9.333c0 1.85.545 3.57 1.473 5.02h-.01l7.87 12.314 7.871-12.314h-.01a9.3 9.3 0 0 0 1.473-5.02"
      />
      <G clipPath="url(#icon-event-map_svg__a)">
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth={0.665}
          d="m16.652 7.433 2.1-1.261m-2.45 0 .7-1.8m.35 4.228 2.276.273"
        />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="m16.436 11.13-3-5.398.3-.987a.166.166 0 0 1 .305-.032l3.634 6.5a.166.166 0 0 1-.194.24zm-3.163-4.857 2.63 4.733-1.08-.139a.33.33 0 0 0-.186.03l-1.616.767-1.794-3.189L12.88 7.32a.33.33 0 0 0 .128-.176zm-2.38 2.436-2.17 1.518a.17.17 0 0 0-.063.084l1.593 2.655a.2.2 0 0 0 .058-.015l.387-.184.044.08 1.381-.69-.024-.041-1.4.65 1.954-.927zm1.438 3.797-1.392.697 1.59 2.88a.186.186 0 0 0 .262.067l1.083-.696a.186.186 0 0 0 .06-.251zm-4.816-.834 1.101-.644 1.073 1.788-1.123.656a.166.166 0 0 1-.228-.06L7.455 11.9a.166.166 0 0 1 .06-.227"
          clipRule="evenodd"
        />
      </G>
      <Defs>
        <ClipPath id="icon-event-map_svg__a">
          <Path fill="#fff" d="M7 4h13v13H7z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SvgIconEventMap;
