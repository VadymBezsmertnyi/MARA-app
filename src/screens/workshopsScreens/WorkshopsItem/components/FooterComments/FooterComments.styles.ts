import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { verticalScale } from "../../../../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 24,
  },
  containerReviews: {
    gap: 12,
  },
  titleReviews: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
  },
  containerOtherReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: verticalScale(85),
    maxHeight: 50,
  },
  containerStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  titleStar: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 28,
  },
  reviewsButton: { paddingVertical: 8 },
  reviewsContainerButton: { flex: 1, height: "auto" },
  containerComments: { gap: 10 },
  containerComment: {
    borderWidth: 1,
    borderRadius: 10,
    color: colors.californiaOrange,
    padding: 8,
    gap: 8,
  },
  headerComment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleName: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  titleDate: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: colors.grayCloudy,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  titleStars: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 10,
    color: colors.blackCoffee,
  },
  comment: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
  },
});
