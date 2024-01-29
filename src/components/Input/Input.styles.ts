import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_600SemiBold",
    paddingTop: 13,
    paddingHorizontal: 16,
    paddingBottom: 16,
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
    flex: 1,
  },
});
