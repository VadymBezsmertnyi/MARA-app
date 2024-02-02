import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    backgroundColor: colors.lightOrange,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectContainer: {
    width: 18,
    height: 18,
    borderColor: colors.blazeOrange,
    borderWidth: 1,
  },
  inSelectContainer: {
    width: 10,
    height: 10,
    backgroundColor: colors.blazeOrange,
    borderRadius: 40,
  },
});
