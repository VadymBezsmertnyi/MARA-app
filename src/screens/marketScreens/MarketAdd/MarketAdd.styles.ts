import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  containerTwoButtons: {
    marginBottom: 20,
  },
  labelInput: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.grayFuscous,
  },
  containerStyle: { flex: 0, marginTop: 20 },
  customStylesInput: { height: 180 },
  containerContacts: {
    marginTop: 10,
  },
  titleContacts: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  labelInputContacts: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.grayCloudy,
  },
  containerButtonSubmit: { marginHorizontal: 36 },
  containerEmpty: { height: 100 },
});
