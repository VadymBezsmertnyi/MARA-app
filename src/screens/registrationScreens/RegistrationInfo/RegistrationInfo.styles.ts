import { StyleSheet } from "react-native";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";
import {
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    gap: verticalScale(8),
  },
  containerHeader: { justifyContent: "center" },
  scrollView: { gap: verticalScale(4) },
  title: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(28),
    textAlign: "center",
  },
  labelPhoneNumber: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
  },
  containerInputs: { gap: verticalScale(2) },
  containerButton: { gap: verticalScale(16) },
});
