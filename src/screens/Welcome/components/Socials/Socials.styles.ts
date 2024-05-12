import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../styles/hooks";

export const styles = StyleSheet.create({
  socialConnect: {
    alignItems: "center",
    gap: verticalScale(20),
  },
  titleSocialConnect: {
    marginBottom: 4,
    color: colors.blackCoffee,
    fontSize: scaleFont(16),
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
  },
  itemSocialConnect: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(12),
  },
  labelSocialConnect: {
    color: colors.chileanFireOrange,
    fontSize: scaleFont(16),
    fontWeight: "600",
  },
  focusTitleSocialConnect: {
    color: colors.white,
  },
  colorWhite: {
    color: colors.white,
  },
  containerButtons: {
    width: "100%",
    gap: verticalScale(8),
  },
});
