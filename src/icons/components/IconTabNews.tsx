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

const SvgIconTabNews = (originalProps: IconType) => {
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
        d="m9.104 21.578-.954.453a.41.41 0 0 1-.529-.163l-.328-.562m1.81.272 4.506 8.165a.457.457 0 0 0 .647.164l2.666-1.713a.457.457 0 0 0 .146-.618l-4.516-7.6zm0 0 5.245-2.489m-9.64-2.216-.587-1.005a.41.41 0 0 1 .12-.541l5.725-4.004m-5.259 5.55-3.44 2.01a.41.41 0 0 0-.147.56l2.174 3.726a.41.41 0 0 0 .56.147l3.44-2.01m-2.587-4.433 2.586 4.433m2.673-9.983 4.51-3.154a.82.82 0 0 0 .313-.433l1.794-5.902a.409.409 0 0 1 .748-.08l8.946 16c.18.322-.125.7-.478.59l-3.334-1.028m-12.5-5.993 4.383 7.766m0 0 4.452-2.113a.8.8 0 0 1 .455-.073l3.21.413M15.65 4.904l6.815 12.412m1.293-8.866 5.173-3.103m-6.035 0L24.62.914m.863 10.409 5.603.674"
      />
    </Svg>
  );
};

export default SvgIconTabNews;
