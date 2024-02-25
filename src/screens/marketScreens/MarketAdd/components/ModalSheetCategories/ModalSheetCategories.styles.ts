import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

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
    fontFamily: "Montserrat_600SemiBold",
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
