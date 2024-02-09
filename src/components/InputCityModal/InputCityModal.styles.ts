import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerTitle: {
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 8,
  },
  lineTitle: {
    width: "100%",
    height: 1,
    backgroundColor: colors.chileanFireOrange,
  },
  containerInput: {
    paddingHorizontal: 16,
    paddingBottom: 7,
    backgroundColor: colors.white,
    shadowColor: colors.gray10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 17.4 / 2,
    elevation: 9,
    borderRadius: 8,
  },
  titleInput: {
    paddingHorizontal: 8,
  },
  containerList: {},
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 24,
  },
  titleItemList: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 5,
  },
  streetTitleItemList: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.blackCoffee,
    fontSize: 16,
  },
  cityTitleItemList: {
    fontFamily: "OpenSans_400Regular",
    color: colors.blackCoffee,
    fontSize: 12,
  },
  containerButton: { paddingHorizontal: 16, paddingVertical: 20 },
  buttonSelectMap: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
});
