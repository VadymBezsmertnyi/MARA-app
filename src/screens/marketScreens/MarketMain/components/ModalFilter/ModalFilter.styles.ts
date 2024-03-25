import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 10,
  },
  containerRightHeader: {
    minWidth: 90,
  },
  headerBackground: {
    backgroundColor: colors.lightOrange,
  },
  containerInputs: { paddingHorizontal: 16, gap: 20 },
  containerStyleInputButton: {
    marginTop: 0,
    backgroundColor: colors.transparent,
    gap: 12,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    marginTop: 0,
    paddingRight: 0,
  },
  containerTwoButtons: { marginBottom: 0 },
  labelSelect: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    lineHeight: 16,
    color: colors.grayFuscous,
  },
  labelOther: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  containerCurrencies: {
    gap: 12,
  },
  listCurrencies: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  containerButtonCurrency: {
    flex: 1,
  },
  titleButtonCurrency: {
    fontSize: 22,
  },
  buttonSubmit: { marginHorizontal: 36, marginTop: 20 },
  containerEmpty: { height: 50 },
});
