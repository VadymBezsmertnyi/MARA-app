import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  addButton: {
    backgroundColor: colors.blueTufts,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: horizontalScale(8),
  },
  addButtonText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: colors.white,
  },
});
