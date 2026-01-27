import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 20,
  },
  headerBackground: {
    backgroundColor: colors.lightOrange,
  },
  containerRightHeader: {
    minWidth: 90,
  },
  containerBody: {
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  buttonSubmit: {
    marginHorizontal: 36,
    marginTop: 20,
  },
  distanceContainer: {
    position: "relative",
    minHeight: 100,
  },
  distanceBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  distanceBlurContent: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 6,
  },
  distanceWarningText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    textAlign: "center",
  },
  distanceButtonContainer: {
    paddingVertical: 6,
  },
  distanceButton: {
    paddingHorizontal: 6,
  },
});
