import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  containerMain: { flex: 1 },
  container: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(17),
    color: colors.grayCloudy,
  },
  containerButton: {
    height: "auto",
  },
  linearContainerButton: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(6),
  },
  titleButton: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(12),
    color: colors.white,
  },
  containerBusiness: { paddingBottom: verticalScale(12) },
  containerBusinessInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  containerBusinessLogo: {
    flex: 1,
    gap: verticalScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBusinessLogo: {
    flex: 1,
    height: "auto",
  },
  titleButtonBusinessLogo: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(12),
    paddingVertical: verticalScale(2),
    paddingHorizontal: horizontalScale(5),
  },
  containerInfoBusiness: {
    flex: 2,
    justifyContent: "space-between",
  },
  titleBusiness: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    lineHeight: 24,
  },
  subTitleBusiness: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    lineHeight: 24,
  },
  containerImage: {
    width: horizontalScale(82),
    height: horizontalScale(82),
    borderRadius: 80,
  },
  containerButtonsBusiness: {
    flex: 1,
    flexDirection: "row",
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(16),
  },
  containerButtonTransparent: {
    flex: 1,
    height: "auto",
  },
  titleButtonTransparent: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(12),
    paddingVertical: verticalScale(6),
  },
});
