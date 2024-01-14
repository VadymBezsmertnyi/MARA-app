import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 40,
    paddingHorizontal: 2,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    padding: 2,
  },
  containerSelect: {
    alignItems: "flex-end",
  },
  containerIn: {
    width: 28,
    height: 28,
    backgroundColor: colors.white,
    borderRadius: 40,
  },
});
