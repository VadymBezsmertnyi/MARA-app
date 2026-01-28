import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import {
  FONT_700_MONTSERRAT,
  FONT_600_MONTSERRAT,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    gap: verticalScale(14),
  },
  containerReviews: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: horizontalScale(12),
  },
  containerOtherReviews: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  titleReviews: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
  },
  containerStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(4),
  },
  titleStar: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  reviewsButton: {
    height: verticalScale(36),
    paddingHorizontal: horizontalScale(12),
  },
  reviewsContainerButton: { paddingHorizontal: 0, paddingVertical: 0 },
  containerComments: {
    gap: verticalScale(12),
    paddingBottom: verticalScale(12),
  },
  containerComment: {
    backgroundColor: colors.white,
    padding: horizontalScale(12),
    borderRadius: horizontalScale(12),
  },
  headerComment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleName: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  titleDate: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(12),
    color: colors.grayCloudy,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
    marginTop: verticalScale(6),
  },
  stars: { flexDirection: "row", gap: horizontalScale(2) },
  titleStars: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(12),
    color: colors.grayFuscous,
  },
  comment: {
    marginTop: verticalScale(6),
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(12),
    color: colors.grayFuscous,
  },
});
