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
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    overflow: "visible",
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
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    paddingHorizontal: horizontalScale(8),
    overflow: "visible",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: verticalScale(16),
    alignSelf: "center",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
  },
  indicatorText: {
    color: colors.white,
    fontSize: scaleFont(14),
    fontFamily: FONT_600_MONTSERRAT,
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
