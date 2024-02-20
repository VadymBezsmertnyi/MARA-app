import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

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
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    lineHeight: 16,
    color: colors.grayFuscous,
  },
  labelOther: {
    fontFamily: "OpenSans_600SemiBold",
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
});
