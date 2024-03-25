import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";

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
  containerInputs: { flex: 1, paddingHorizontal: 16, gap: 16 },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.grayFuscous,
  },
  titleCoordinates: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.grayFuscous,
    textAlign: "center",
  },
  subTitleCoordinates: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.grayFuscous,
    textAlign: "center",
  },
  lineHeader: { width: "100%", height: 1, marginTop: 16 },
  input: { marginTop: 20 },
  containerSubmitModalTypeWork: {
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },
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
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackRich,
  },
});
