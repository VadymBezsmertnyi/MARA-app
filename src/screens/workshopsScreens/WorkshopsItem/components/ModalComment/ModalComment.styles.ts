import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, gap: 28 },
  containerHeader: { alignItems: "center" },
  titleHeader: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: colors.grayFuscous,
  },
  containerBody: {
    paddingHorizontal: 16,
    gap: 20,
  },
  containerStyle: { flex: 0, marginTop: 0 },
  customStylesInput: { height: 180 },
  containerStars: { flexDirection: "row", gap: 8 },
  containerButton: { paddingHorizontal: 52 },
  errorMessage: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 10,
    color: colors.errorRed,
    marginTop: 4,
    minHeight: 20,
  },
});
