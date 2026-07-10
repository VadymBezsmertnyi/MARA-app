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

const SvgIconAutoMap = (originalProps: IconType) => {
  const { ...props } = originalProps;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
    >
      <Rect width={28} height={28} rx={3} />
      <Path
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.043}
        d="M4.096 14A9.9 9.9 0 0 1 14 4.096 9.9 9.9 0 0 1 23.904 14 9.9 9.9 0 0 1 14 23.904 9.9 9.9 0 0 1 4.096 14Zm18.562 0c0-4.777-3.88-8.658-8.658-8.658S5.342 9.222 5.342 14s3.88 8.658 8.658 8.658 8.658-3.88 8.658-8.658ZM11.24 16.52c-.674-1.135-1.984-1.806-5.08-2.456.001-.719.12-1.472.319-2.285 3.635-.909 5.59-1.367 7.522-1.367s3.887.458 7.524 1.367c.189.661.29 1.485.317 2.285-3.096.65-4.406 1.321-5.08 2.455-.338.568-.515 1.249-.678 2.096q-.077.397-.155.847c-.117.654-.248 1.395-.442 2.24a8 8 0 0 1-1.486.14c-.51 0-1.002-.05-1.486-.14-.194-.845-.325-1.586-.442-2.24q-.079-.45-.154-.847c-.164-.847-.341-1.528-.678-2.096ZM17.16 14A3.165 3.165 0 0 0 14 10.842 3.165 3.165 0 0 0 10.842 14 3.165 3.165 0 0 0 14 17.158 3.165 3.165 0 0 0 17.158 14Zm-5.5 0A2.335 2.335 0 0 1 14 11.658 2.335 2.335 0 0 1 16.342 14 2.335 2.335 0 0 1 14 16.342 2.335 2.335 0 0 1 11.658 14Z"
      />
    </Svg>
  );
};

export default SvgIconAutoMap;
