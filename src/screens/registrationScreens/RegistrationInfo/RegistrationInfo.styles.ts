import { StyleSheet } from "react-native";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";
import { FONT_700_MONTSERRAT } from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    gap: verticalScale(40),
  },
  containerHeader: { justifyContent: "center" },
  title: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(28),
    textAlign: "center",
  },
  containerInputs: { gap: verticalScale(30) },
  containerButton: { gap: verticalScale(16) },
});
