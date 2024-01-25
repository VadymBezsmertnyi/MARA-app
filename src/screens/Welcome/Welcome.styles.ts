import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerBlur: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.grayBlur,
    paddingBottom: 74,
    paddingHorizontal: 15,
  },
  containerLogo: { justifyContent: "center", alignItems: "center" },
  containerLanguage: { width: "100%", alignItems: "flex-end" },
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
