import { StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    gap: verticalScale(12),
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: horizontalScale(80),
    height: horizontalScale(80),
    borderRadius: 40,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
    marginLeft: horizontalScale(12),
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(4),
  },
  profileName: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(18),
    color: colors.blackCoffee,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 12,
  },
  verifiedText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(10),
    color: "#4CAF50",
    marginLeft: horizontalScale(2),
  },
  profileLocation: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayCloudy,
    marginBottom: verticalScale(4),
  },
  profilePhone: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.grayCloudy,
  },
  settingsButton: {
    padding: horizontalScale(8),
  },
  // Legacy styles (kept for compatibility)
  containerMain: { flexDirection: "row", gap: horizontalScale(12) },
  titlesMain: { flex: 1, gap: verticalScale(4) },
  titleInfo: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  containerImage: {
    width: horizontalScale(82),
    height: horizontalScale(82),
    borderRadius: 80,
  },
  containerOtherContacts: {
    gap: verticalScale(4),
  },
  titleOtherContacts: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.blackRich,
  },
});
