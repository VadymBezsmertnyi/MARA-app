import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitles: {
    gap: 4,
    paddingVertical: 9,
  },
  title: {
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  map: {
    flex: 1,
  },
  containerFooter: {
    position: "absolute",
    backgroundColor: colors.white,
    bottom: 0,
    width: "100%",
    paddingTop: 8,
    paddingBottom: 28,
    paddingHorizontal: 16,
    gap: 8,
  },
  containerList: {
    overflow: "visible",
  },
  itemList: {
    width: 300,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayMercury,
    paddingVertical: 12,
    paddingLeft: 8,
    paddingRight: 6,
    marginRight: 10,
  },
  titlesItemList: {
    gap: 12,
  },
  titleItemList: {
    width: 210,
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "600",
    overflow: "hidden",
  },
  subTitleItemList: {
    width: 210,
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: "400",
  },
  containerLocationItemList: { flexDirection: "row", alignItems: "center" },
  titleLocationItemList: {
    color: colors.grayFuscous,
    fontSize: 12,
    fontWeight: "600",
  },
});
