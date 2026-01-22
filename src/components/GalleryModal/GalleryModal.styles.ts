import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";
import { horizontalScale, scaleFont } from "../../../styles/hooks";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.black,
  },
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  containerHeader: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizontalScale(11),
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 10,
  },
  buttonBack: {
    padding: horizontalScale(4),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(17),
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(17),
  },
  containerEmpty: { width: horizontalScale(70) },
  containerGallery: {
    backgroundColor: colors.transparent,
    flex: 1,
  },
  containerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
