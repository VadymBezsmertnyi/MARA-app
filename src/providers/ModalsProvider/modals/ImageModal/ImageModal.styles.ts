import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.white70,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  titleHeader: {
    color: colors.blackCoffee,
    fontSize: 16,
    fontWeight: "600",
  },
  containerBody: {
    flex: 1,
    justifyContent: "center",
    gap: 60,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  containerButtons: {
    paddingHorizontal: 16,
    gap: 12,
  },
  titleButtonDelete: {
    color: colors.grayCloudy,
    fontSize: 16,
    fontWeight: "600",
  },
});
