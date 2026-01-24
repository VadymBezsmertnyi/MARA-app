import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const SLIDER_HEIGHT = 220;

export const styles = StyleSheet.create({
  container: {
    height: SLIDER_HEIGHT,
    backgroundColor: colors.white,
  },
  sliderFrame: {
    height: SLIDER_HEIGHT,
    backgroundColor: colors.lightOrange,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  imageWrapper: {
    width: "101%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  indicator: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  indicatorText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
});
