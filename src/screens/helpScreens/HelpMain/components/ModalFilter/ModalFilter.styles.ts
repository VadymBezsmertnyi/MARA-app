import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 20,
  },
  headerBackground: {
    backgroundColor: colors.lightOrange,
  },
  containerRightHeader: {
    minWidth: 90,
  },
  containerBody: {
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
    marginBottom: 8,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.grayCloudy,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.blazeOrange,
  },
  filterChipText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  verifiedChip: {
    minWidth: 60,
  },
  clearButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  clearButtonText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.errorRed,
  },
  buttonSubmit: {
    marginHorizontal: 36,
    marginTop: 20,
  },
});
