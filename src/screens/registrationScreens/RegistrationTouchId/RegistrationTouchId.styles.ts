import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  containerClose: {
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  containerTitles: { flex: 1, gap: 20, alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.blackCoffee,
    textAlign: "center",
  },
  subTitle: {
    width: 200,
    fontSize: 16,
    fontWeight: "600",
    color: colors.grayFuscous,
    textAlign: "center",
  },
  containerIcon: {
    flex: 1,
    gap: 28,
    alignItems: "center",
  },
  titleIcon: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.blackCoffee,
  },
  containerButtons: { gap: 24 },
});
