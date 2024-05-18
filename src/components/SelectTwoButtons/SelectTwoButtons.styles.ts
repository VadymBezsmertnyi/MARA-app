import { StyleSheet } from "react-native";
import { FONT_600_MONTSERRAT } from "../../../styles/constants";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 40,
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
  },
  labelRegular: { color: colors.errorRed },
  containerSelectType: {
    flexDirection: "row",
    gap: 9,
  },
  buttonSelectType: {
    flex: 1,
  },
});
