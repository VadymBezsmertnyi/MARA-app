import { PixelRatio, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const fontScale = PixelRatio.getFontScale();

const baseWidth = 393;
export const baseHeight = 852;

export const horizontalScale = (size: number) => (width / baseWidth) * size;
export const verticalScale = (size: number) => (height / baseHeight) * size;

export const scaleFont = (size: number) => {
  const scaledSize = horizontalScale(size);

  return Platform.OS === "ios"
    ? scaledSize
    : Math.floor(scaledSize / fontScale);
};
