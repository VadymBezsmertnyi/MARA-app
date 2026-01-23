import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";

const MIN_HEIGHT = 44;

export const styles = StyleSheet.create({
  containerUp: {
    position: "absolute",
    width: "100%",
    minHeight: verticalScale(MIN_HEIGHT),
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(3),
    gap: 13,
  },
});
