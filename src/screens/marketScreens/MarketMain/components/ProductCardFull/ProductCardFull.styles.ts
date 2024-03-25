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
  },
  image: {
    width: "100%",
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerCity: {
    width: horizontalScale(200),
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
    width: "90%",
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
    lineHeight: 16,
    minHeight: 38,
  },
  containerLike: {
    position: "absolute",
    padding: 18,
    top: -10,
    right: -10,
  },
});
