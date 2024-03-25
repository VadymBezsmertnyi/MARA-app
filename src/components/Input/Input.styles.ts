import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
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
  },
  input: {
    fontFamily: FONT_600_OPEN_SANS,
    paddingTop: verticalScale(13),
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(16),
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: colors.blackCoffee,
    flex: 1,
  },
  containerMaxLength: {
    alignItems: "flex-end",
  },
  titleMaxLength: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.grayCloudy,
  },
  titleMaxLengthError: {
    color: colors.errorRed,
  },
  errorMessage: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(10),
    color: colors.errorRed,
    marginTop: verticalScale(4),
    minHeight: verticalScale(20),
  },
});
