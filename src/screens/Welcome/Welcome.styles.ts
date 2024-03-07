import { Platform, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerBlur: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:
      Platform.OS === "ios" ? colors.white70 : colors.whiteTransparentFifteen,
    paddingBottom: verticalScale(74),
    paddingHorizontal: horizontalScale(15),
  },
  containerLogo: { justifyContent: "center", alignItems: "center" },
  containerLanguage: { width: "100%", alignItems: "flex-end" },
  containerTitles: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: scaleFont(28),
    color: colors.blackCoffee,
  },
  subTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  containerSocials: {
    width: "100%",
    alignItems: "center",
    paddingTop: verticalScale(8),
    paddingHorizontal: horizontalScale(55),
    gap: 20,
  },
});
