const template = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  return tpl`
import React from "react";
import { IconType } from '../icon.types';
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
  Rect
} from "react-native-svg";
${"\n"}
const ${componentName} = (originalProps: IconType) => {
  const { ...props } = originalProps;
  ${"\n"}
  return ${jsx}
};
${"\n"}
export default ${componentName};
`;
};

module.exports = template;
