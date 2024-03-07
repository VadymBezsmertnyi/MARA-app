import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_400Regular",
    fontSize: scaleFont(16),
    color: colors.grayCloudy,
  },
  titleMaxLengthError: {
    color: colors.errorRed,
  },
  errorMessage: {
    fontFamily: "Montserrat_700Bold",
    fontSize: scaleFont(10),
    color: colors.errorRed,
    marginTop: verticalScale(4),
    minHeight: verticalScale(20),
  },
});
