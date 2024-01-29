import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 20,
  },
  containerTitle: {
    gap: 12,
  },
  firstTitle: {
    fontFamily: "Montserrat_700Bold",
    color: colors.blackCoffee,
    fontSize: 20,
  },
  secondTitle: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.grayFuscous,
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  containerSubTitle: { gap: 12 },
  firstSubTitle: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.blackCoffee,
    fontSize: 16,
  },
  secondSubTitle: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.grayCod,
    fontSize: 16,
    opacity: 0.6,
    lineHeight: 24,
  },
  colorWhite: { color: colors.white },
});
