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
    paddingTop: verticalScale(16),
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleModal: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
    flex: 1,
  },
  closeButton: {
    padding: horizontalScale(4),
  },
  lineHeader: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(16),
  },
  titleInput: {
    paddingHorizontal: horizontalScale(8),
  },
  containerInput: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(14),
  },
  wrapperInput: {
    paddingRight: horizontalScale(20),
  },
  scrollView: {
    flex: 1,
  },
  containerScroll: {
    paddingHorizontal: horizontalScale(24),
    paddingTop: verticalScale(38),
  },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    minHeight: horizontalScale(40),
  },
  titleItemList: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  containerEmpty: {
    height: verticalScale(20),
  },
  containerButtons: {
    paddingTop: verticalScale(24),
    paddingHorizontal: horizontalScale(12),
    paddingBottom: verticalScale(Platform.OS === "ios" ? getBottomSpace() : 24),
  },
});
