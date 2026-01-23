import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    backgroundColor: colors.lightOrange,
    padding: 12,
    borderRadius: 20,
  },
  containerHeader: {
    alignItems: "flex-end",
  },
  containerButtons: {
    padding: 6,
    paddingTop: 7,
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayCloudy,
    marginVertical: 7,
  },
  buttonItem: {
    width: "100%",
    paddingVertical: 4,
  },
  buttonItemSelected: {
    backgroundColor: colors.blazeOrange,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  titleButton: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  titleButtonSelected: {
    color: colors.white,
  },
  subTitleButton: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 15,
    color: colors.blackCoffee,
  },
  subTitleButtonSelected: {
    color: colors.white,
  },
  distanceButtonContainer: {
    position: "relative",
    width: "100%",
  },
  buttonItemDisabled: {
    opacity: 0.5,
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
    paddingVertical: 16,
    alignItems: "center",
    gap: 12,
  },
  distanceWarningText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    textAlign: "center",
  },
  distanceButton: {
    minWidth: 200,
  },
});
