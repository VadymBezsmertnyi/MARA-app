import { CSSProperties } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import colors from "../../../styles/colors";

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
    fontFamily: "OpenSans_600SemiBold",
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
    fontFamily: "OpenSans_400Regular",
    fontSize: scaleFont(17),
  },
  titleButtonDeleteEvent: {
    fontFamily: "OpenSans_400Regular",
    fontSize: scaleFont(16),
  },
});
