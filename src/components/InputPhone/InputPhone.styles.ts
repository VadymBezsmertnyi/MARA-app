import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 6,
  },
  label: {
    width: "100%",
    color: colors.grayFuscous,
    fontSize: 12,
    fontWeight: "600",
  },
  phoneInput: {
    width: "100%",
    borderColor: colors.gainsboroGray,
    borderWidth: 1,
    borderRadius: 4,
  },
  containerFlag: {
    backgroundColor: colors.grayMercury,
    paddingVertical: 16,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flagIcon: { width: 26, height: 16 },
  inputError: {
    borderColor: colors.errorRed,
  },
  errorMessage: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 10,
    minHeight: 20,
    fontFamily: "Montserrat_700Bold",
    fontSize: 10,
    color: colors.errorRed,
  },
  colorWhite: { color: colors.white },
  backgroundDark: { backgroundColor: colors.grayFuscous },
});
