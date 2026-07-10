import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { verticalScale } from "../../../styles/hooks";

export const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: colors.chileanFireOrange || "#FF6B35",
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },
  titleTextStyle: {
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  messageTextStyle: {
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "300",
    marginTop: verticalScale(4),
  },
});
