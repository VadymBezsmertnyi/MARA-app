import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  labelRegular: { color: colors.errorRed },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.grayCloudy,
    borderRadius: 4,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: colors.blackCoffee,
  },
  inputPlaceholder: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.grayCloudy,
    fontSize: 16,
  },
  inputValue: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
  },
  errorMessage: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 10,
    color: colors.errorRed,
    marginTop: 4,
    minHeight: 20,
  },
});
