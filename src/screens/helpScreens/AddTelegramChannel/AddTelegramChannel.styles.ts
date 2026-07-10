import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: verticalScale(10),
  },
  scrollView: {
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(6),
    gap: verticalScale(8),
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: colors.blackRich,
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  labelInput: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  containerLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buttonLocation: {
    flex: 1,
  },
  buttonMap: {
    paddingTop: verticalScale(16),
    paddingLeft: horizontalScale(12),
    paddingBottom: verticalScale(8),
  },
  formGroup: {
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
  locationText: {
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
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
  empty: {
    height: verticalScale(20),
  },
});
