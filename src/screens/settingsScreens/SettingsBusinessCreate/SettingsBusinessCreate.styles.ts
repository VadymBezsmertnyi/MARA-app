import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";
import colors from "../../../../styles/colors";
import { FONT_400_OPEN_SANS } from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRightHeader: { width: horizontalScale(70) },
  containerMain: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120),
    gap: verticalScale(20),
  },
  containerLogo: { alignItems: "center" },
  containerInput: { paddingHorizontal: horizontalScale(16), marginTop: 0 },
  labelInput: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
    paddingHorizontal: horizontalScale(16),
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  containerInputOtherPhone: {
    backgroundColor: colors.lightOrange,
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(20),
  },
  labelInputOtherPhone: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
    marginBottom: verticalScale(4),
  },
  checkboxInputOtherPhone: {
    backgroundColor: colors.white,
  },
  containerButton: {
    paddingHorizontal: horizontalScale(16),
  },
});
