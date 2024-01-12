import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerBlur: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.grayBlur,
    paddingTop: 56,
    paddingBottom: 74,
    paddingHorizontal: 15,
  },
  containerLogo: { justifyContent: "center", alignItems: "center" },
  containerLanguage: { width: "100%", alignItems: "flex-end" },
  buttonLanguage: { flexDirection: "row", gap: 12 },
  iconLanguage: { width: 24, height: 24 },
  titleLanguage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.blackCoffee,
  },
  containerTitles: { gap: 12, alignItems: "center" },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: colors.blackCoffee,
  },
  subTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerSocials: {
    flex: 0,
    alignItems: "center",
    marginVertical: 0,
    paddingTop: 8,
    gap: 20,
  },
});
