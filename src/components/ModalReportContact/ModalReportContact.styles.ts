import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../styles/constants";

export const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    minWidth: 300,
    maxWidth: 400,
  },
  containerClose: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  titleModal: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 18,
    color: colors.blackCoffee,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleModal: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    marginBottom: 20,
    textAlign: "center",
  },
  containerButtons: {
    gap: 12,
  },
  buttonContact: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.lightOrange,
    borderWidth: 1,
    borderColor: colors.californiaOrange,
  },
  buttonText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    textAlign: "center",
  },
});
