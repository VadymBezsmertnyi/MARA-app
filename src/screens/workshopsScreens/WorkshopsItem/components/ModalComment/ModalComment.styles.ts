import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import { FONT_700_MONTSERRAT } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: { flex: 1, gap: verticalScale(28) },
  containerHeader: { alignItems: "center" },
  titleHeader: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(20),
    color: colors.grayFuscous,
  },
  containerBody: {
    paddingHorizontal: horizontalScale(16),
    gap: verticalScale(20),
  },
  containerStyle: { flex: 0, marginTop: 0 },
  customStylesInput: { height: verticalScale(180) },
  containerStars: { flexDirection: "row", gap: horizontalScale(8) },
  containerButton: { paddingHorizontal: horizontalScale(52) },
  errorMessage: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(10),
    color: colors.errorRed,
    marginTop: verticalScale(4),
    minHeight: verticalScale(20),
  },
  containerEmpty: {
    height: verticalScale(120),
  },
});
