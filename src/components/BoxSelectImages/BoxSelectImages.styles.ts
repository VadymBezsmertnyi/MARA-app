import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";
import { scaleFont, verticalScale } from "../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    gap: verticalScale(12),
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  subTitle: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.grayCloudy,
  },
});
