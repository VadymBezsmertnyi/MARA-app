import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { verticalScale } from "../../../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 24,
  },
  containerReviews: {
    gap: 12,
  },
  titleReviews: {
    fontFamily: "Montserrat_600SemiBold",
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
    fontFamily: "Montserrat_700Bold",
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
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  titleDate: {
    fontFamily: "OpenSans_400Regular",
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
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 10,
    color: colors.blackCoffee,
  },
  comment: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    color: colors.blackCoffee,
  },
});
