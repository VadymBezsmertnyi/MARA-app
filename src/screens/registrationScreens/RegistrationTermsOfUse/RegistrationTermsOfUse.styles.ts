import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  containerHeader: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  containerTitle: {
    gap: 12,
    paddingHorizontal: 16,
  },
  firstTitle: {
    fontFamily: FONT_700_MONTSERRAT,
    color: colors.blackCoffee,
    fontSize: 20,
  },
  secondTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.grayFuscous,
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  containerSubTitle: { gap: 12, paddingHorizontal: 16 },
  firstSubTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: 16,
  },
  secondSubTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.grayCod,
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  colorWhite: { color: colors.white },
});
