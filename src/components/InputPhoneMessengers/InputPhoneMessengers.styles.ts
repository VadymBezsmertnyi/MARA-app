import { StyleSheet } from "react-native";
import { horizontalScale } from "../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
  },
  containerInput: { gap: 0 },
  containerMessengers: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 20,
  },
  containerMessenger: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
});
