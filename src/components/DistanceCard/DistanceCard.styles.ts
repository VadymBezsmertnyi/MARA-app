import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { FONT_600_MONTSERRAT } from "../../../styles/constants";
import { horizontalScale, scaleFont } from "../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
});
