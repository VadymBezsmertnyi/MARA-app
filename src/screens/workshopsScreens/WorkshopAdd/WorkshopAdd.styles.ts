import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {},
  scrollView: {
    paddingBottom: 20,
  },
  containerInputs: {
    paddingHorizontal: 16,
  },
  containerStyle: { flex: 0, marginTop: 0 },
  customStylesInput: { height: 180 },
  labelInput: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.grayFuscous,
  },
  labelContacts: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    marginBottom: verticalScale(4),
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  containerEmpty: {
    height: 150,
  },
  containerSubmit: {
    gap: 10,
  },
  errorMessage: {
    fontFamily: FONT_700_MONTSERRAT,
    textAlign: "center",
    color: colors.errorRed,
    minHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(10),
    gap: horizontalScale(8),
  },
  contactInputContainer: {
    flex: 1,
  },
  deleteContactIconButton: {
    marginTop: verticalScale(25),
    padding: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  addContactButtonContainer: {
    marginTop: verticalScale(10),
    alignSelf: "flex-start",
    height: "auto",
  },
  addContactButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    minWidth: 0,
    height: "auto",
  },
  addContactText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
});
