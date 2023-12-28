import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerInput: {
    paddingHorizontal: 16,
    paddingBottom: 7,
    shadowColor: colors.gray10,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 9,
  },
  containerList: {},
});
