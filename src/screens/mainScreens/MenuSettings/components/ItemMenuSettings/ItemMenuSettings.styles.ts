import { StyleSheet } from "react-native";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
});
