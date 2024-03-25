import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { horizontalScale } from "../../../../../../styles/hooks";
import {
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    paddingBottom: 16,
    position: "relative",
    justifyContent: "space-between",
  },
  image: {
    height: 126,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  body: {
    marginTop: 8,
    paddingHorizontal: 10,
    gap: 10,
  },
  containerSubTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerCity: {
    width: horizontalScale(140),
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  subTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.grayCloudy,
  },
  title: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
    lineHeight: 16,
  },
  containerLike: {
    position: "absolute",
    padding: 7,
    top: -5,
    right: -5,
  },
});
