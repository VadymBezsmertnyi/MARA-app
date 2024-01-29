import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  title: {
    fontFamily: "Montserrat_700Bold",
    color: colors.blackRich,
    fontSize: 20,
  },
  containerList: {
    gap: 12,
  },
});
