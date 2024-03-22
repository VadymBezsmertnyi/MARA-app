import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    gap: verticalScale(12),
  },
  containerMain: { flexDirection: "row", gap: horizontalScale(12) },
  titlesMain: { flex: 1, gap: verticalScale(4) },
  titleInfo: { fontFamily: "OpenSans_600SemiBold", fontSize: 16 },
  containerImage: {
    width: horizontalScale(82),
    height: horizontalScale(82),
    borderRadius: 80,
  },
  containerOtherContacts: {
    gap: verticalScale(4),
  },
  titleOtherContacts: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
});
