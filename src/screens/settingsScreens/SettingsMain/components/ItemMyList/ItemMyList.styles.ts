import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    gap: verticalScale(20),
  },
  containerTitles: {
    gap: verticalScale(8),
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    textAlign: "center",
    color: colors.blackRich,
  },
  containerAmount: {
    flexDirection: "row",
    justifyContent: "center",
    gap: horizontalScale(23),
  },
  titleAmount: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayCloudy,
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: horizontalScale(23),
  },
  containerButton: { flex: 1, height: "auto" },
  linearContainerButtonView: { height: "auto" },
  linearContainerButton: { paddingVertical: verticalScale(12) },
  buttonAdd: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  buttonTitleAdd: {
    color: colors.white,
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
  },
});
