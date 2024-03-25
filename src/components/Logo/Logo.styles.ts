import { StyleSheet } from "react-native";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import { FONT_700_MONTSERRAT } from "../../../styles/constants";

export const styles = StyleSheet.create({
  containerLogo: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: horizontalScale(316),
    gap: verticalScale(12),
  },
  imageLogo: { width: "100%", height: verticalScale(230) },
  titleLogo: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(24),
    textAlign: "center",
    lineHeight: 29,
  },
});
