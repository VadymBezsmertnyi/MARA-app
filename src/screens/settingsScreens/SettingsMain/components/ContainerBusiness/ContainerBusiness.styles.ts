import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

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
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_600SemiBold",
    fontSize: scaleFont(12),
    paddingVertical: verticalScale(6),
  },
});
