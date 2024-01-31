import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  containerIndicator: {
    position: "absolute",
    width: 2,
    top: 16,
    right: 4,
    height: "90%",
    backgroundColor: colors.white,
    overflow: "hidden",
    borderRadius: 1,
  },
  indicator: {
    width: 2,
    height: 72,
    backgroundColor: colors.californiaOrange,
  },
});
