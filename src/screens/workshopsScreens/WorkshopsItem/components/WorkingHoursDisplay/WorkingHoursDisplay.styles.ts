import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    marginBottom: verticalScale(5),
  },
  scheduleContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(4),
  },
  scheduleText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    lineHeight: 24,
  },
});
