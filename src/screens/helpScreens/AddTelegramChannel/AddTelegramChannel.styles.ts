import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  saveButton: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blueTufts,
  },
  content: {
    flex: 1,
    padding: horizontalScale(16),
  },
  formGroup: {
    marginBottom: verticalScale(20),
  },
  formLabel: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
    marginBottom: verticalScale(8),
  },
  formInput: {
    borderWidth: 1,
    borderColor: colors.grayMercury,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    backgroundColor: colors.white,
  },
  formInputMultiline: {
    height: verticalScale(80),
    textAlignVertical: "top",
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: colors.grayMercury,
    borderRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    marginRight: horizontalScale(8),
    backgroundColor: colors.white,
  },
  categoryChipActive: {
    backgroundColor: colors.blueTufts,
    borderColor: colors.blueTufts,
  },
  categoryChipText: {
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  buttonLocation: {
    marginBottom: verticalScale(8),
  },
});
