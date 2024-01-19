import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(4),
    paddingRight: horizontalScale(4),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    shadowColor: "rgba(82, 77, 34, 0.10)",
    elevation: 20,
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  containerLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  image: { width: 60, height: 52, borderRadius: 3 },
  containerTitles: {
    width: horizontalScale(220),
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  address: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  containerTitlesNotImage: {
    width: horizontalScale(280),
    justifyContent: "space-around",
  },
  part: { justifyContent: "space-around" },
  containerLocation: { flexDirection: "row" },
  distance: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
});
