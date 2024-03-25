import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_MONTSERRAT } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineHeader: { width: "100%", height: 1, marginTop: 16 },
  inputSearch: { marginTop: 8 },
  containerList: {
    padding: 24,
  },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  containerEmpty: {
    height: 20,
  },
  containerSubmitModalTypeWork: {
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
});
