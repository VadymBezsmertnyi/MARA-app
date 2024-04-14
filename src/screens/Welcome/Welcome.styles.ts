import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";
import {
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  containerImage: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    bottom: 0,
  },
  containerBlur: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  containerBody: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: verticalScale(74),
    paddingHorizontal: horizontalScale(15),
  },
  containerLogo: { justifyContent: "center", alignItems: "center" },
  containerLanguage: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "android" ? verticalScale(10) : 0,
  },
  containerTitles: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.white,
  },
  subTitle: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.white,
  },
  containerSocials: {
    width: "100%",
    alignItems: "center",
    paddingTop: verticalScale(8),
    paddingHorizontal: horizontalScale(55),
    gap: 20,
  },
});
