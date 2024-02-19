import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  socialConnect: {
    alignItems: "center",
    gap: 20,
  },
  titleSocialConnect: {
    marginBottom: 4,
    color: colors.blackCoffee,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
  },
  itemSocialConnect: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelSocialConnect: {
    color: colors.chileanFireOrange,
    fontSize: 16,
    fontWeight: "600",
  },
  focusTitleSocialConnect: {
    color: colors.white,
  },
  colorWhite: {
    color: colors.white,
  },
  containerButtons: {
    width: "100%",
    gap: 8,
  },
});
