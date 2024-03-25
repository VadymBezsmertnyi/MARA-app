import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import { FONT_600_MONTSERRAT } from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: verticalScale(52),
  },
  linearGradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: horizontalScale(2),
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
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.white,
  },
  transparent: {
    color: colors.chileanFireOrange,
  },
});
