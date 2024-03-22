import { Platform, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 10,
  },
  containerHeader: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonsHeaderLeft: {
    width: "30%",
  },
  buttonsHeaderRight: {
    width: "30%",
    alignItems: "flex-end",
  },
  titleDelete: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.grayCloudy,
  },
  titleHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
    color: colors.grayCloudy,
  },
  titleLogout: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerLineEmpty: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayMercury,
  },
  lineEmptyFirst: {
    marginBottom: 10,
    width: "100%",
    height: 1,
    backgroundColor: colors.grayMercury,
  },
  lineEmpty: {
    marginTop: 16,
    marginBottom: 10,
    width: "100%",
    height: 1,
    backgroundColor: colors.grayMercury,
  },
  containerEmpty: {
    height: 100,
  },
  containerList: {},
  containerFooter: {
    paddingHorizontal: 20,
  },
});
