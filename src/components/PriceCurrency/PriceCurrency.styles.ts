import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
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
    fontFamily: "Montserrat_700Bold",
    fontSize: 10,
    color: colors.errorRed,
    marginTop: 4,
    minHeight: 20,
  },
});
