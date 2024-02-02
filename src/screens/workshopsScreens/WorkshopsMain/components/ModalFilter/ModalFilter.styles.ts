import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

const WIDTH = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 20,
  },
  headerBackground: {
    backgroundColor: colors.lightOrange,
  },
  containerBody: {
    paddingLeft: 20,
    paddingRight: 16,
    gap: 20,
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  containerFullTrack: {
    gap: 16,
  },
  labelSectors: {
    fontFamily: "OpenSans_600SemiBold",
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
  numbersThumb: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.blackCoffee,
  },
  numberThumb: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.blackCoffee,
    position: "absolute",
    top: -20,
    width: 30,
    textAlign: "center",
  },
  maximumTrackStyle: { backgroundColor: colors.white, height: 6 },
  minimumTrackStyle: { width: "100%", height: 6, borderRadius: 10 },
  containerPointers: {
    width: "100%",
    paddingHorizontal: 25,
    top: -10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  containerSelectRatings: {
    gap: 12,
  },
  containerRatings: {
    flexDirection: "row",
    gap: 16,
  },
  containerRating: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  titleRating: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  titleSelectRating: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.white,
  },
  buttonSubmit: { marginHorizontal: 36, marginTop: 20 },
  containerModalType: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  titleModalType: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineModalType: { width: "100%", height: 1, marginTop: 16, marginBottom: 13 },
  containerSelect: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSelect: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
});
