import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: verticalScale(10),
  },
  scrollView: {
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(6),
    gap: verticalScale(8),
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: horizontalScale(8),
  },
  containerPrices: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  lineInputs: {
    width: horizontalScale(13),
    height: verticalScale(1),
    backgroundColor: colors.black,
  },
  inner: {
    flex: 2,
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: colors.blackRich,
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  multipleInput: {
    height: verticalScale(110),
    width: "100%",
  },
  containerLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buttonLocation: { flex: 1 },
  buttonMap: {
    paddingTop: verticalScale(16),
    paddingLeft: horizontalScale(12),
    paddingBottom: verticalScale(8),
  },
  errorMessage: { textAlign: "center", color: colors.errorRed },
  empty: {
    height: verticalScale(200),
  },
});
