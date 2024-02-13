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
  labelInput: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.grayFuscous,
  },
});
