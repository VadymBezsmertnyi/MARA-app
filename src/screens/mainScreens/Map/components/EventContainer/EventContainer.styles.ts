import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const MIN_HEIGHT = 44;

const MIN_WIDTH_CONTAINER = 222;
const TOP_CONTAINER = 110;

export const styles = StyleSheet.create({
  linearGradientContainer: {
    position: "absolute",
    top: verticalScale(TOP_CONTAINER),
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    minWidth: horizontalScale(MIN_WIDTH_CONTAINER),
    minHeight: verticalScale(MIN_HEIGHT),
    overflow: "hidden",
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  mainTitle: {
    fontFamily: "OpenSans_400Regular",
    color: colors.white,
    fontSize: 12,
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.white,
    fontSize: 16,
  },
  subTitle: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.white,
    fontSize: 12,
  },
  dateTitle: {
    fontFamily: "OpenSans_400Regular",
    color: colors.white,
    fontSize: 12,
  },
});
