import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_600_MONTSERRAT,
  FONT_700_MONTSERRAT,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  labelRegular: { color: colors.errorRed },
  containerInputs: {
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },
  containerInput: {
    flex: 1,
  },
  input: {
    paddingTop: 13,
  },
  errorMessage: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 10,
    color: colors.errorRed,
    marginTop: 4,
    minHeight: 20,
  },
});
