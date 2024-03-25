import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

const WIDTH = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: { gap: 40, width: "100%" },
  containerInfo: { gap: 20, width: "100%" },
  containerSlider: { height: 184, paddingHorizontal: 20 },
  imagesScroll: { borderRadius: 3, backgroundColor: colors.transparent },
  title: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 20,
    paddingHorizontal: 16,
    color: colors.blackCoffee,
  },
  containerPlaceData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  titleDate: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.grayCloudy,
  },
  containerCity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  subTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
  },
  containerPrice: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    fontSize: 20,
    gap: 12,
  },
  iconWrapperLightBlue: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.blueLight,
  },
  titlePrice: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 20,
    color: colors.blackRich,
  },
  containerMainInfo: {
    gap: 20,
  },
  containerDescription: {
    gap: 12,
  },
  titleDescription: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 20,
    paddingHorizontal: 16,
  },
  containerItemsDescriptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.lightOrange,
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 10,
    gap: 12,
    rowGap: 8,
  },
  description: {
    paddingHorizontal: 16,
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  containerViews: {
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "flex-end",
  },
  titleViews: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.blackRich,
  },
  containerEmpty: {
    height: 200,
  },
  containerButtons: {
    position: "absolute",
    width: WIDTH,
    bottom: 100,
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: 16,
  },
  containerButton: {
    gap: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 19,
  },
  titleButton: {
    fontFamily: FONT_600_MONTSERRAT,
    color: colors.white,
    fontSize: 16,
  },
  containerTelegram: {
    flex: 1,
  },
});
