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
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
  },
  containerModalType: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerHeader: {
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
    marginBottom: verticalScale(24),
  },
  containerBody: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
  },
  containerSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  titleSelect: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  containerRightSelect: {
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
  },
  containerButtons: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
  },
});
