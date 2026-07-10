import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";

export const styles = StyleSheet.create({
  button: {
    height: verticalScale(40),
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: horizontalScale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    flex: 1,
  },
  buttonRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
    paddingLeft: horizontalScale(8),
  },
  clearButton: {
    width: horizontalScale(28),
    height: verticalScale(28),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.blackCoffee,
    fontSize: scaleFont(14),
    flexShrink: 1,
  },
  buttonTextPlaceholder: {
    color: colors.grayCloudy,
  },
  sheetContent: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    gap: verticalScale(12),
  },
  sheetContentBottomPadding: {
    paddingBottom: verticalScale(12),
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetHeaderSide: {
    width: horizontalScale(36),
    alignItems: "center",
    justifyContent: "center",
  },
  sheetCloseButton: {
    width: horizontalScale(36),
    height: verticalScale(36),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  sheetTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: colors.blackCoffee,
    textAlign: "center",
  },
  selectContainer: {
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  selectContainerOpen: {
    borderWidth: 0,
  },
  selectHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    paddingRight: horizontalScale(16),
    paddingLeft: horizontalScale(12),
  },
  selectHeaderOpen: {
    paddingLeft: 0,
    paddingRight: 0,
    gap: 0,
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingLeft: 0,
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
  },
  inputOpen: {
    paddingHorizontal: horizontalScale(12),
  },
  dropdownList: {
    maxHeight: verticalScale(320),
    backgroundColor: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grayMercury,
    width: "100%",
  },
  dropdownItem: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
  },
  dropdownItemText: {
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
  },
  noResultsText: {
    padding: horizontalScale(12),
    textAlign: "center",
    color: colors.grayCloudy,
  },
  saveButton: {
    height: verticalScale(46),
  },
});
