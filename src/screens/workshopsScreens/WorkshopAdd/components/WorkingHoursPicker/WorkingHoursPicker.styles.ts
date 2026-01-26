import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 12,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
    marginBottom: 12,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinumGray,
  },
  dayLabel: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timePicker: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
  timeSeparator: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
    marginHorizontal: 8,
  },
  errorText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.errorRed,
    marginTop: 4,
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
