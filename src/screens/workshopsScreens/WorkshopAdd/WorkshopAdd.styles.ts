import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

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
  contactContainer: {
    marginBottom: 10,
  },
  deleteContactButton: {
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.errorRed,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  deleteContactText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.white,
  },
  addContactButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayFuscous,
    alignItems: "center",
  },
  addContactText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.grayFuscous,
  },
});
