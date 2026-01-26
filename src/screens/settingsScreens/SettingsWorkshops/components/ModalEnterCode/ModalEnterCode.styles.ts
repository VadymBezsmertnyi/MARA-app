import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayCloudy,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 10,
  },
  inputError: {
    borderColor: colors.errorRed,
  },
  errorText: {
    color: colors.errorRed,
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
