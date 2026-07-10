import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grayMercury,
    borderRadius: horizontalScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    backgroundColor: colors.white,
  },
  resultsContainer: {
    maxHeight: verticalScale(120),
    borderWidth: 1,
    borderColor: colors.grayMercury,
    borderRadius: horizontalScale(8),
    marginTop: verticalScale(4),
    backgroundColor: colors.white,
  },
  resultItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
  },
  resultText: {
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
  },
});
