import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import { FONT_600_MONTSERRAT } from "../../../styles/constants";

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
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
  },
  titleHeader: {
    color: colors.blackCoffee,
    fontSize: scaleFont(16),
    fontFamily: FONT_600_MONTSERRAT,
  },
  containerBody: {
    flex: 1,
    justifyContent: "center",
    gap: verticalScale(60),
  },
  image: {
    width: SCREEN_WIDTH * 0.9,
    height: verticalScale(300),
  },
  containerButtons: {
    paddingHorizontal: horizontalScale(16),
    gap: verticalScale(12),
    paddingBottom: verticalScale(16),
  },
  titleButtonDelete: {
    color: colors.grayCloudy,
    fontSize: scaleFont(16),
    fontFamily: FONT_600_MONTSERRAT,
  },
});
