import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const PADDING_HORIZONTAL = horizontalScale(16);
const BORDER_RADIUS = horizontalScale(12);

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS,
    padding: PADDING_HORIZONTAL,
    marginVertical: verticalScale(8),
    marginHorizontal: PADDING_HORIZONTAL,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: horizontalScale(3.84),
    elevation: verticalScale(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(12),
  },
  titleContainer: {
    flex: 1,
    marginRight: horizontalScale(12),
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
    marginBottom: verticalScale(8),
  },
  categoryBadge: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: horizontalScale(12),
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: scaleFont(10),
    fontWeight: "500",
    textTransform: "uppercase",
  },
  verificationContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: verticalScale(4),
  },
  verifiedBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: horizontalScale(12),
  },
  verifiedText: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: colors.white,
  },
  aiVerifiedBadge: {
    backgroundColor: "#2196F3",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: horizontalScale(12),
  },
  aiVerifiedText: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: colors.white,
  },
  description: {
    fontSize: scaleFont(14),
    color: colors.gray,
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(12),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationInfo: {
    flex: 1,
    flexDirection: "column",
    gap: verticalScale(2),
  },
  locationText: {
    fontSize: scaleFont(12),
    color: colors.gray,
  },
  reportButton: {
    backgroundColor: "#FF5252",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: horizontalScale(8),
  },
  reportButtonText: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: colors.white,
  },
});
