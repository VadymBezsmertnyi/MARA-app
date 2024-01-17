import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    justifyContent: "space-between",
    paddingBottom: 78,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 9,
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  imageProfile: {
    width: 38,
    height: 38,
    backgroundColor: colors.grayMercury,
    borderRadius: 40,
  },
  imageProfileEmpty: {
    width: 38,
    height: 38,
    backgroundColor: colors.grayMercury,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleProfile: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  boxHeaderEmpty: {
    width: 24,
  },
  titleHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
    color: colors.blackCoffee,
  },
  lineWhite: {
    height: 1,
    backgroundColor: colors.white,
  },
  containerCheckboxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  titleDarkTheme: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.blackCoffee,
    fontSize: 16,
  },
  titleSos: {
    fontFamily: "Montserrat_700Bold",
    color: colors.blackCoffee,
    fontSize: 20,
  },
});
