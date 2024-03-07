import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(40),
  },
  containerBody: {
    flex: 1,
  },
  containerTitle: {
    paddingTop: verticalScale(64),
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: scaleFont(20),
    textAlign: "center",
  },
  containerLocation: {
    flexDirection: "row",
    paddingTop: verticalScale(40),
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleLocation: {
    fontFamily: "OpenSans_400Regular",
    color: colors.grayFuscous,
    maxWidth: horizontalScale(203),
    fontSize: scaleFont(16),
  },
  containerCity: {
    paddingTop: verticalScale(60),
    gap: verticalScale(20),
  },
  titleCity: {
    fontFamily: "Montserrat_700Bold",
    fontSize: scaleFont(20),
    textAlign: "center",
  },
  inputCity: {
    borderColor: colors.californiaOrange,
  },
  containerFooter: {
    gap: verticalScale(20),
  },
  titleTermsPolicy: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.grayCloudy,
    textAlign: "center",
    fontSize: scaleFont(12),
  },
  linkTermsPolicy: {
    color: colors.blueTufts,
  },
});
