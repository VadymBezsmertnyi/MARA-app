import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  containerModalTypeWork: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  containerHeaderTypeWork: {
    paddingHorizontal: 16,
  },
  titleModalType: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineModalType: { width: "100%", height: 1, marginTop: 16, marginBottom: 13 },
  containerTypesWork: {
    gap: 24,
    paddingHorizontal: 16,
  },
  containerTypeWork: {
    flexDirection: "row",
    gap: 51,
  },
  containerTitlesTypeWork: {
    flex: 1,
    gap: 6,
  },
  titleTypeWork: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
  },
  subTitleTypeWork: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
  },
  containerSubmitModalTypeWork: {
    padding: 24,
    paddingBottom: 0,
  },
});
