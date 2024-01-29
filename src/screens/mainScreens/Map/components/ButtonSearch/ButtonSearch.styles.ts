import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const CURRENT_RIGHT = 10;
const IOS_BOTTOM = 90;
const ANDROID_BOTTOM = 120;
const CURRENT_BOTTOM = Platform.OS === "ios" ? IOS_BOTTOM : ANDROID_BOTTOM;

export const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    position: "absolute",
    right: horizontalScale(CURRENT_RIGHT),
    bottom: verticalScale(CURRENT_BOTTOM),
    borderRadius: 40,
    backgroundColor: colors.black80,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.brownShadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
