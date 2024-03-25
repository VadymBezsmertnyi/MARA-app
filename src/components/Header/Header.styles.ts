import { CSSProperties } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: horizontalScale(15),
    paddingBottom: verticalScale(2),
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: horizontalScale(10),
    minWidth: horizontalScale(90),
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: scaleFont(17),
    textAlign: "center",
  },
  containerButtonBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(15),
  },
  iconButtonBack: {
    stroke: colors.blackCoffee,
    strokeWidth: horizontalScale(2),
  } as CSSProperties & ViewStyle,
  iconButtonBackWhite: {
    stroke: colors.white,
  } as CSSProperties & ViewStyle,
  titleButtonBack: {
    color: colors.blackCoffee,
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(17),
  },
  titleButtonDeleteEvent: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(16),
  },
});
