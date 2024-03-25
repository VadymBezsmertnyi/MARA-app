import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, gap: 20 },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
  },
  containerCheckButton: {
    alignItems: "center",
    width: "100%",
  },
  checkButton: {
    flexDirection: "row",
    paddingHorizontal: 38,
  },
  leftButton: {
    flex: 1,
    right: -10,
    opacity: 1,
  },
  rightButton: { flex: 1, left: -10, opacity: 1 },
  styleLinearButtons: { opacity: 1 },
  titleButtons: {
    textTransform: "uppercase",
  },
  containerList: {
    position: "relative",
    maxHeight: 564,
    marginTop: 4,
  },
  containerServices: {
    backgroundColor: colors.lightOrange,
    paddingVertical: 16,
    paddingRight: 8,
    borderRadius: 10,
  },
  containerService: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 4,
  },
  containerInfoService: { flex: 1, gap: 6, paddingTop: 10 },
  titleInfoService: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
  subTitleInfoService: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
  },
  containerEmpty: { height: 30 },
});
