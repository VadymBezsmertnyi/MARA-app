import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    backgroundColor: colors.lightOrange,
    padding: 12,
    paddingTop: 0,
    paddingRight: 0,
    borderRadius: 20,
  },
  containerHeader: {
    alignItems: "flex-end",
  },
  buttonClose: {
    padding: 12,
  },
  containerButtons: {
    padding: 24,
    paddingTop: 14,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 28,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayCloudy,
  },
  titleButton: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: colors.blackCoffee,
  },
});
