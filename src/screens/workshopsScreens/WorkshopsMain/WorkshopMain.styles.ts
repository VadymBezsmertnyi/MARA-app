import { Dimensions, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../styles/hooks";
import colors from "../../../../styles/colors";
import { FONT_700_MONTSERRAT } from "../../../../styles/constants";

const HEIGHT = Dimensions.get("window").height;

const PADDING_HORIZONTAL = 16;
const GAP_MAIN = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerHeader: { paddingRight: 0 },
  containerRightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  wrapper: {
    gap: verticalScale(GAP_MAIN),
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingBottom: verticalScale(PADDING_HORIZONTAL),
  },
  search: {
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingBottom: verticalScale(GAP_MAIN),
  },
  iconInput: {
    marginRight: 16,
  },
  containerEmpty: {
    height: 70,
  },
  containerNotList: {
    height: HEIGHT - 400,
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
});
