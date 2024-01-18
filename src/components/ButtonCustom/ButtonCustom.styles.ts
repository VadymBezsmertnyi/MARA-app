import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    height: 52,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    padding: 2,
  },
  buttonSubmit: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
  full: {
    backgroundColor: colors.transparent,
  },
  dark: {
    backgroundColor: colors.blackRich,
  },
  buttonSubmitText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.white,
  },
  transparent: {
    color: colors.chileanFireOrange,
  },
});
