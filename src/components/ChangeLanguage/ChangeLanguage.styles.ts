import { Platform, StyleSheet, Dimensions } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

// colors
import colors from "../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
} from "../../../styles/constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  buttonLanguage: {
    flexDirection: "row",
    gap: horizontalScale(8),
    alignItems: "center",
  },
  iconLanguage: { width: horizontalScale(24), height: verticalScale(24) },
  titleLanguage: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    textTransform: "uppercase",
    color: colors.blackCoffee,
  },
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
  containerModal: {
    flex: 1,
    position: "relative",
  },
  headerModal: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(6),
  },
  titleModal: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(18),
    color: colors.grayFuscous,
    flex: 1,
  },
  closeButton: {
    padding: horizontalScale(4),
    marginLeft: horizontalScale(8),
  },
  lineHeader: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  titleInput: {
    paddingHorizontal: horizontalScale(8),
  },
  containerInput: {
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4),
  },
  wrapperInput: {
    paddingRight: horizontalScale(20),
  },
  input: {
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
  },
  scrollView: {
    flex: 1,
  },
  containerScroll: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    borderRadius: horizontalScale(8),
  },
  titleItemList: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    flex: 1,
  },
  containerEmpty: {
    height: verticalScale(12),
  },
  containerButtons: {
    paddingTop: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    paddingBottom: verticalScale(12),
  },
});
