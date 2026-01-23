import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

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
  },
  containerModalTypeWork: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
    justifyContent: "space-between",
  },
  containerHeaderTypeWork: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
  },
  titleModalType: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
  },
  lineModalType: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(13),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerTypesWork: {
    gap: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  containerTypeWork: {
    flexDirection: "row",
    gap: horizontalScale(51),
  },
  containerTitlesTypeWork: {
    flex: 1,
    gap: verticalScale(6),
  },
  titleTypeWork: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
  },
  subTitleTypeWork: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(12),
  },
  containerSubmitModalTypeWork: {
    padding: horizontalScale(24),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
  },
});
