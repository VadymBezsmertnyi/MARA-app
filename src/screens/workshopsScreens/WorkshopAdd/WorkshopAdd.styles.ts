import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {},
  containerInputs: {
    paddingHorizontal: 16,
  },
  containerStyle: { flex: 0, marginTop: 0 },
  customStylesInput: { height: 180 },
  labelInput: {
    fontFamily: "OpenSans_400Regular",
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
    fontFamily: "Montserrat_700Bold",
    textAlign: "center",
    color: colors.errorRed,
    minHeight: 20,
  },
});
