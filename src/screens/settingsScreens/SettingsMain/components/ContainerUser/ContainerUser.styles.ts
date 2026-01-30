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
    marginBottom: verticalScale(16),
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
  profileName: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(18),
    color: colors.blackCoffee,
    marginBottom: verticalScale(2),
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
  // Stats container styles
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: verticalScale(16),
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(20),
    color: colors.blackCoffee,
    marginBottom: verticalScale(2),
  },
  statLabel: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: scaleFont(12),
    color: colors.grayCloudy,
  },
  statDivider: {
    width: 1,
    height: verticalScale(40),
    backgroundColor: colors.grayMercury,
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
