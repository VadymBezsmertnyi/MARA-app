import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  buttonLanguage: { flexDirection: "row", gap: 12 },
  iconLanguage: { width: 24, height: 24 },
  titleLanguage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.blackCoffee,
  },
});
