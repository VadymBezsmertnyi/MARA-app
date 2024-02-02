import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.brownShadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  container: {
    minHeight: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(4),
    paddingRight: horizontalScale(4),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: colors.grayShadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
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
  containerLocation: { flexDirection: "row", alignItems: "center" },
  distance: {
    flex: 1,
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
});
