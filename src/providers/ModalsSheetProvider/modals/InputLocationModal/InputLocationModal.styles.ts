import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  containerInput: {
    paddingHorizontal: 16,
    paddingBottom: 7,
    backgroundColor: "white",
    shadowColor: colors.gray10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 17.4 / 2,
    elevation: 9,
    borderRadius: 8,
  },
  containerList: {},
  itemList: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayCloudy,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 5,
  },
  streetTitleItemList: {
    color: colors.blackCoffee,
    fontSize: 16,
    fontWeight: "600",
  },
  cityTitleItemList: {
    color: colors.blackCoffee,
    fontSize: 12,
    fontWeight: "400",
  },
  containerButton: { paddingHorizontal: 16, paddingVertical: 20 },
  buttonSelectMap: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  titleButtonSelectMap: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
