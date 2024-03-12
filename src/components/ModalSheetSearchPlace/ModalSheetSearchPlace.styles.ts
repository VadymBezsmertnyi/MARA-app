import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { horizontalScale } from "../../../styles/hooks";

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
  wrapperInput: { paddingRight: 20 },
  containerList: {
    padding: 24,
    paddingTop: 16,
    paddingHorizontal: 14,
  },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 10,
    minHeight: 40,
  },
  titleItemList: {
    width: horizontalScale(300),
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  titleEmptyList: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    color: colors.blackCoffee,
    textAlign: "center",
    marginVertical: 10,
  },
  titleOtherList: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.errorRed,
    textAlign: "center",
    marginVertical: 10,
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
