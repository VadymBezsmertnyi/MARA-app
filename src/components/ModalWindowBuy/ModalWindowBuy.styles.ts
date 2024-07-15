import { StyleSheet } from "react-native";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
  FONT_700_OPEN_SANS,
} from "../../../styles/constants";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  containerShadow: {
    width: "90%",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FONT_700_OPEN_SANS,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONT_600_MONTSERRAT,
    color: colors.blackCoffee,
    textAlign: "center",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  titleOr: {
    fontSize: 14,
    fontFamily: FONT_400_OPEN_SANS,
    color: colors.blackRangoonGreen,
  },
  titleFeedback: {
    fontSize: 16,
    fontFamily: FONT_600_MONTSERRAT,
    color: colors.blueTufts,
    textAlign: "center",
  },
  titleThanks: {
    fontSize: 14,
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackRich,
    textAlign: "center",
  },
});
