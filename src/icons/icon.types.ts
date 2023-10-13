import type React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type IconType = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  fill?: string;
  style?: StyleProp<ViewStyle>;
};
