import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  containerTitles: {
    gap: 4,
    paddingVertical: 9,
  },
  title: {
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
});
