import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(2),
  },
  containerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(4),
  },
  titleFirstLine: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
  titleButtonFirstLine: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 15,
  },
  buttonBusinessLogo: {
    flex: 1,
    height: "auto",
  },
  titleButtonBusinessLogo: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(12),
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(5),
  },
  titleMiddleLine: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.grayCloudy,
  },
  buttonEndLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerIconEndLine: {
    width: 20,
    height: 20,
    backgroundColor: colors.grayMercury,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  titleButtonEndLine: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
  },
});
