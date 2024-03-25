import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

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
