import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import { FONT_700_MONTSERRAT } from "../../../../../../styles/constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
  },
  containerModal: {
    flex: 1,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(12),
  },
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
