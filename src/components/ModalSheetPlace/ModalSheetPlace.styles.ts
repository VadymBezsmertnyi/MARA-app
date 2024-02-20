import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const WIDTH = Dimensions.get("screen").width;

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
  titleCoordinates: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
    textAlign: "center",
  },
  subTitleCoordinates: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.grayFuscous,
    textAlign: "center",
  },
  lineHeader: { width: "100%", height: 1, marginTop: 16 },
  inputSearch: { marginTop: 8 },
  containerList: {
    padding: 24,
    paddingTop: 16,
    paddingHorizontal: 14,
  },
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
  containerSubmitModalTypeWork: {
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
  containerEmpty: { height: 30 },
  containerInputs: { flex: 1, paddingHorizontal: 16, gap: 16 },
  input: { marginTop: 20 },
  containerMap: { flex: 1 },
  map: {
    flex: 1,
    minWidth: 10,
    minHeight: 10,
  },
  containerLineCoordinates: {
    position: "absolute",
    width: WIDTH,
    top: 0,
    left: 0,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  lineCoordinates: {
    backgroundColor: colors.lightOrange,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  titleLineCoordinates: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackRich,
  },
});
