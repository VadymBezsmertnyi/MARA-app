import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    backgroundColor: colors.lightOrange,
    padding: 12,
    borderRadius: 20,
  },
  containerHeader: {
    alignItems: "flex-end",
  },
  containerButtons: {
    padding: 24,
    paddingTop: 28,
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayCloudy,
    marginVertical: 28,
  },
  titleButton: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  subTitleButton: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 15,
    color: colors.blackCoffee,
  },
});
