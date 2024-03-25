import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: colors.grayFuscous,
  },
  value: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.chileanFireOrange,
  },
});
