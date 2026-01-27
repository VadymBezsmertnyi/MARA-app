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
  selectHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    paddingRight: horizontalScale(16),
    paddingLeft: horizontalScale(12),
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingLeft: 0,
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
  },
  dropdownList: {
    maxHeight: verticalScale(220),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayMercury,
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
});
