import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
    marginBottom: 20,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  containerCurrent: {
    marginBottom: 20,
  },
  containerTwoInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  containerInput: {
    flex: 1,
  },
});
