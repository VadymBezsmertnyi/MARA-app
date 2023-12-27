import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  label: { fontSize: 16, fontWeight: "600", color: colors.blackCoffee },
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
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: colors.blackCoffee,
    flex: 1,
  },
  inputPlaceholder: {
    color: colors.grayCloudy,
    fontSize: 16,
  },
  inputValue: {
    color: colors.blackCoffee,
    fontWeight: "600",
  },
});
