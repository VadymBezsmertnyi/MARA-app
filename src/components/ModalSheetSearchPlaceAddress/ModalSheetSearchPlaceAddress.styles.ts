import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerHeader: {
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(8),
    paddingTop: verticalScale(10),
  },
  containerInputs: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    gap: verticalScale(16),
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
  },
  titleCoordinates: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
    textAlign: "center",
  },
  subTitleCoordinates: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
    textAlign: "center",
    marginTop: verticalScale(4),
  },
  lineHeader: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(16),
  },
  input: { marginTop: verticalScale(20) },
  containerSubmitModalTypeWork: {
    padding: horizontalScale(24),
    paddingBottom: verticalScale(40),
    gap: verticalScale(12),
  },
  containerMap: { flex: 1 },
  map: {
    flex: 1,
    minWidth: 10,
    minHeight: 10,
  },
  containerLineCoordinates: {
    position: "absolute",
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    paddingTop: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
  },
  lineCoordinates: {
    backgroundColor: colors.lightOrange,
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderRadius: horizontalScale(8),
  },
  titleLineCoordinates: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.blackRich,
  },
});
