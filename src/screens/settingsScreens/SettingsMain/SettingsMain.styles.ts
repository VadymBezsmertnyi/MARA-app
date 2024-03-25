import { Platform, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import { horizontalScale, verticalScale } from "../../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonsHeaderLeft: {
    width: "30%",
  },
  buttonsHeaderRight: {
    width: "30%",
    alignItems: "flex-end",
  },
  titleDelete: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.grayCloudy,
  },
  titleHeader: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
    color: colors.grayCloudy,
  },
  titleLogout: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerLineEmpty: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayMercury,
  },
  containerEmpty: {
    height: 100,
  },
  containerList: {},
  containerFooter: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
  },
});
