import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 12,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 4,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 16,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
  },
  labelRegular: { color: colors.errorRed },
  input: {
    fontFamily: FONT_600_OPEN_SANS,
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
    zIndex: 999,
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
