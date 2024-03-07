import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const CURRENT_RIGHT = 10;
const IOS_BOTTOM = 100;
const ANDROID_BOTTOM = 180;
const CURRENT_BOTTOM = Platform.OS === "ios" ? IOS_BOTTOM : ANDROID_BOTTOM;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: horizontalScale(CURRENT_RIGHT),
    bottom: verticalScale(CURRENT_BOTTOM),
  },
  blurViewContainer: {
    width: horizontalScale(72),
    height: horizontalScale(72),
    borderRadius: 40,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.black80,
    justifyContent: "center",
    alignItems: "center",
  },
});
