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

const SvgIconWarningGradient = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 130 130"
      {...props}
    >
      <Path
        fill="url(#icon-warning-gradient_svg__a)"
        d="M64.999 29.851c3.038 0 6.061 1.918 8.363 5.753l32.023 53.376c4.61 7.664 1.051 13.937-7.886 13.937h-65c-8.938 0-12.497-6.278-7.887-13.937l32.023-53.376C58.938 31.769 61.96 29.85 65 29.85m0-10.833c-7.02 0-13.444 4.008-17.653 11.001L15.323 83.406c-4.258 7.09-4.724 14.652-1.274 20.746s10.179 9.598 18.45 9.598h65c8.271 0 15.004-3.499 18.449-9.593s2.984-13.655-1.273-20.746L82.652 30.036c-4.21-7.01-10.633-11.018-17.653-11.018"
      />
      <Path
        fill="url(#icon-warning-gradient_svg__b)"
        d="M65.001 93.708a7.042 7.042 0 1 0 0-14.083 7.042 7.042 0 0 0 0 14.083"
      />
      <Path
        fill="url(#icon-warning-gradient_svg__c)"
        d="M73.126 54.167a8.12 8.12 0 0 0-8.125-8.126 8.12 8.12 0 0 0-7.524 11.17c3.001 7.453 7.524 18.622 7.524 18.622l7.535-18.622c.368-.937.59-1.967.59-3.044"
      />
      <Defs>
        <LinearGradient
          id="icon-warning-gradient_svg__a"
          x1={65.153}
          x2={-64.187}
          y1={-80.268}
          y2={55.397}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-warning-gradient_svg__b"
          x1={65.022}
          x2={45.817}
          y1={64.865}
          y2={82.786}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
        <LinearGradient
          id="icon-warning-gradient_svg__c"
          x1={65.028}
          x2={32.111}
          y1={14.818}
          y2={31.566}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.109} stopColor="#FDA005" />
          <Stop offset={1} stopColor="#FD5E01" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgIconWarningGradient;
