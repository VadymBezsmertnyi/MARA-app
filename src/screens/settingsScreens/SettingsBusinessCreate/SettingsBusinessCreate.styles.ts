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
    fontFamily: "OpenSans_400Regular",
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
    fontFamily: "OpenSans_400Regular",
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
