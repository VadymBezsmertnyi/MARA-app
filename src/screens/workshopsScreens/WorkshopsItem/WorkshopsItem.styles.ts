import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: { gap: 8 },
  containerEmpty: { height: 190 },
  containerMain: { gap: 40, width: "100%" },
  containerInfo: { gap: 20, width: "100%" },
  containerSlider: { height: 184, paddingHorizontal: 20 },
  info: {
    width: WIDTH - 20,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "flex-start",
  },
  titles: { gap: 12 },
  titleInfo: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: colors.blackCoffee,
  },
  subTitleInfo: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerContacts: {
    gap: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerPhone: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  containerIcon: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.blueLight,
    shadowColor: colors.grayShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.8,
  },
  titlePhone: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerIconsService: {
    flexDirection: "row",
  },
  autoIcon: { left: 27 },
  containerMap: {
    height: 400,
  },
  containerDescription: {
    gap: 12,
    paddingHorizontal: 20,
  },
  titleDescription: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  description: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  buttonDescription: {
    justifyContent: "flex-end",
  },
  titleButtonDescription: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: colors.blueTufts,
  },
});
