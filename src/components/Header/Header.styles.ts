import { CSSProperties } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingBottom: 2,
  },
  containerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    minWidth: 90,
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.blackCoffee,
    fontSize: 17,
    textAlign: "center",
  },
  containerButtonBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  iconButtonBack: {
    stroke: colors.blackCoffee,
    strokeWidth: 2,
  } as CSSProperties & ViewStyle,
  iconButtonBackWhite: {
    stroke: colors.white,
  } as CSSProperties & ViewStyle,
  titleButtonBack: {
    color: colors.blackCoffee,
    fontFamily: "OpenSans_400Regular",
    fontSize: 17,
  },
  titleButtonDeleteEvent: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
});
