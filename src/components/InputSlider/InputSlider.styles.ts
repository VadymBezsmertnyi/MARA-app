import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";

const WIDTH = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  labelSectors: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerTrack: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  track: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trackStyle: { width: WIDTH * 0.75 },
  containerIcon: {
    position: "relative",
    width: 24,
    height: 24,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  lineMinusIcon: {
    width: 8,
    height: 2,
    backgroundColor: colors.black,
  },
  linePlusIcon: {
    position: "absolute",
    width: 2,
    height: 8,
    backgroundColor: colors.black,
  },
  containerThumb: { position: "relative", alignItems: "center" },
  thumbLinerGradientStyle: {
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbStyle: {
    borderRadius: 20,
    backgroundColor: "white",
    width: 12,
    height: 12,
  },
  numberThumb: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    position: "absolute",
    top: -20,
    minWidth: 100,
    textAlign: "center",
  },
  minimumTrackStyle: { width: "100%", height: 6, borderRadius: 10 },
  maximumTrackStyle: { backgroundColor: colors.white, height: 6 },
  containerPointers: {
    width: "100%",
    paddingHorizontal: 25,
    top: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numbersThumb: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
});
