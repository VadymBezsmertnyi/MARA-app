import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  buttonLanguage: { flexDirection: "row", gap: 12 },
  iconLanguage: { width: 24, height: 24 },
  titleLanguage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.blackCoffee,
  },
  containerModal: { flex: 1, position: "relative" },
  headerModal: { paddingHorizontal: 16 },
  titleModal: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineHeader: { width: "100%", height: 1, marginTop: 16 },
  titleInput: {
    paddingHorizontal: 8,
  },
  containerInput: {
    marginTop: 12,
    marginBottom: 14,
  },
  wrapperInput: {
    paddingRight: 20,
  },
  containerScroll: { paddingHorizontal: 24, paddingTop: 38 },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    minHeight: 40,
  },
  titleItemList: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerButtons: {
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 42,
  },
});
