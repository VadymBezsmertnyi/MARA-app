import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 36,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingRight: 10,
    alignItems: "center",
  },
  boxHeaderEmpty: {
    width: 24,
  },
  titleHeader: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
    color: colors.blackCoffee,
  },
  buttonClose: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  containerBody: {
    paddingHorizontal: 20,
    gap: 40,
  },
  titleBody: {
    fontFamily: FONT_700_MONTSERRAT,
    textAlign: "center",
    fontSize: 20,
    color: colors.blackCoffee,
  },
  containerInput: {
    flex: 0,
    maxWidth: 155,
    backgroundColor: colors.transparent,
    marginTop: 0,
    padding: 0,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  labelInputContacts: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleDarkTheme: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: 16,
  },
});
