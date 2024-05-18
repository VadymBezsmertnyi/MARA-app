import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

const MIN_HEIGHT = 44;

const MIN_WIDTH_CONTAINER = 222;

export const styles = StyleSheet.create({
  linearGradientContainer: {
    position: "absolute",
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
    fontFamily: FONT_400_OPEN_SANS,
    color: colors.white,
    fontSize: 12,
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.white,
    fontSize: 16,
  },
  subTitle: {
    width: horizontalScale(220),
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.white,
    fontSize: 12,
  },
  dateTitle: {
    fontFamily: FONT_400_OPEN_SANS,
    color: colors.white,
    fontSize: 12,
  },
});
