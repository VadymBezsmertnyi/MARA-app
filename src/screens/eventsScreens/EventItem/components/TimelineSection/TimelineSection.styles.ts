import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  list: {
    marginTop: 10,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  time: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.grayFuscous,
    minWidth: 90,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
  description: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: colors.grayFuscous,
  },
});
