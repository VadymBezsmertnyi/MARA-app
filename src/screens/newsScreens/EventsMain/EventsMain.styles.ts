import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";
import {
  FONT_600_MONTSERRAT,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

const PADDING_HORIZONTAL = 16;
const PADDING_TOP = 8;
const PADDING_BOTTOM = 36;
const GAP_MAIN = 28;
const FONT_SIZE_TITLE_TYPE = 20;
const FONT_SIZE_TITLE_MORE = 16;
const PADDING_VERTICAL = 8;
const GAP_MORE = 8;

export const styles = StyleSheet.create({
  containerHeader: { paddingRight: 0 },
  containerRightHeader: { minHeight: 0, width: 50 },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingTop: verticalScale(PADDING_TOP),
    paddingBottom: verticalScale(PADDING_BOTTOM),
    gap: verticalScale(GAP_MAIN),
  },
  containerPart: { gap: verticalScale(GAP_MORE) },
  titleType: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(FONT_SIZE_TITLE_TYPE),
  },
  containerEvents: { gap: 8 },
  buttonMore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(PADDING_VERTICAL),
    gap: horizontalScale(GAP_MORE),
  },
  titleButtonMore: {
    fontFamily: FONT_600_MONTSERRAT,
    color: colors.blueTufts,
    fontSize: scaleFont(FONT_SIZE_TITLE_MORE),
  },
  containerNotList: {
    height: verticalScale(280),
    alignItems: "center",
    justifyContent: "center",
  },
  imageNotElements: {
    width: "100%",
    height: "90%",
  },
  titleNotList: {
    fontFamily: FONT_700_MONTSERRAT,
  },
  containerEmpty: {
    height: verticalScale(40),
  },
});
