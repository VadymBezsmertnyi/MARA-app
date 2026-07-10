import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const PADDING_HORIZONTAL = 16;
const PADDING_TOP = 8;
const GAP_MAIN = 13;
const FONT_SIZE_TITLE = 16;
const FONT_SIZE_DESCRIPTION = 12;
const FONT_SIZE_INFO = 10;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightOrange,
    paddingLeft: horizontalScale(PADDING_TOP),
    paddingRight: horizontalScale(PADDING_HORIZONTAL),
    paddingVertical: verticalScale(PADDING_TOP),
    gap: verticalScale(GAP_MAIN),
    borderRadius: 8,
    shadowColor: colors.grayShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: scaleFont(FONT_SIZE_TITLE),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  description: {
    fontSize: scaleFont(FONT_SIZE_DESCRIPTION),
    color: colors.blackCoffee,
    marginTop: 5,
  },
  fitContent: {
    flex: 1,
  },
  wrapper: {
    marginTop: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: scaleFont(FONT_SIZE_INFO),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  image: {
    width: 73,
    height: 73,
    borderRadius: 3,
  },
  moto: {
    position: "absolute",
    right: -8,
    bottom: -7,
  },
  auto: {
    position: "absolute",
    right: 0,
    bottom: -7,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  notComments: {
    fontSize: scaleFont(FONT_SIZE_INFO),
    fontWeight: "600",
    color: colors.grayCloudy,
  },
  distanceWarning: {
    fontSize: scaleFont(8),
    fontWeight: "400",
    color: colors.grayCloudy,
    marginTop: 2,
  },
  distanceError: {
    fontSize: scaleFont(9),
    fontWeight: "500",
    color: colors.grayCloudy,
  },
});
