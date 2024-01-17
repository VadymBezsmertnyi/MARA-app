import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 9,
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
});
