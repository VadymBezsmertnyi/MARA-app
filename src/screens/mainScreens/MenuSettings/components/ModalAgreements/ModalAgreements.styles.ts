import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../../../styles/colors";
import { horizontalScale } from "../../../../../../styles/hooks";

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
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
  },
  webView: {
    flex: 1,
  },
});
