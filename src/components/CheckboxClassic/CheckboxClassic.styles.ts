import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: colors.lightOrange,
    borderRadius: 3,
    overflow: "hidden",
  },
  containerLinearGradient: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.black35,
    padding: 3,
  },
  notCheck: {},
});
