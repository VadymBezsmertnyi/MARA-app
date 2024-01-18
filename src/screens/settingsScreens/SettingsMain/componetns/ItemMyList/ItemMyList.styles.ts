import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 20,
  },
  buttonTo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleTo: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  buttonAdd: {
    flexDirection: "row",
    gap: 10,
  },
  titleAdd: {
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
});
