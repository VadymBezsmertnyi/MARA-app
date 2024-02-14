import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 4,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  label: { fontSize: 12, fontWeight: "600", color: colors.blackCoffee },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
    textAlign: "center",
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerBlur: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
  },
});
