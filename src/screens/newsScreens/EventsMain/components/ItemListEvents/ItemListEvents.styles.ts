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
    flex: 1,
    minHeight: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(4),
    paddingRight: horizontalScale(4),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.lightOrange,
    borderWidth: 1,
    borderColor: colors.lightOrange,
    borderRadius: 4,
    gap: 6,
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
    zIndex: 0,
  },
  containerOld: {
    backgroundColor: colors.grayMercury,
    borderColor: colors.grayMercury,
  },
  containerNow: {
    backgroundColor: colors.white,
    borderColor: colors.blazeOrange,
  },
  containerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  image: { width: 60, height: 52, borderRadius: 3 },
  containerTitles: {
    flex: 1,
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
  part: {
    minWidth: 70,
    justifyContent: "space-around",
  },
  partNow: {
    paddingRight: horizontalScale(18),
  },
  containerLocation: { flexDirection: "row", alignItems: "center" },
  distance: {
    flex: 1,
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
  containerNowLabel: {
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  titleNowLabel: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
  },
});
