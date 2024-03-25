import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

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
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
  address: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
  },
  containerTitlesNotImage: {
    width: horizontalScale(280),
    justifyContent: "space-around",
  },
  part: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingRight: horizontalScale(8),
  },
  partNow: {},
  containerLocation: { flexDirection: "row", alignItems: "center" },
  distance: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
  },
  containerNowLabel: {
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  titleNowLabel: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.white,
    textAlign: "center",
  },
});
