import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {},
  containerInputs: {
    paddingHorizontal: 16,
    gap: 40,
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
  containerImages: {
    gap: 12,
  },
  titleContainerImages: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  subtitleContainerImages: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.grayCloudy,
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
