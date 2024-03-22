import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    gap: verticalScale(20),
  },
  containerTitles: {
    gap: verticalScale(8),
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: scaleFont(16),
    textAlign: "center",
    color: colors.blackRich,
  },
  containerAmount: {
    flexDirection: "row",
    justifyContent: "center",
    gap: horizontalScale(23),
  },
  titleAmount: {
    fontFamily: "OpenSans_400Regular",
    fontSize: scaleFont(14),
    color: colors.grayCloudy,
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: horizontalScale(23),
  },
  containerButton: { flex: 1, height: "auto" },
  linearContainerButtonView: { height: "auto" },
  linearContainerButton: { paddingVertical: verticalScale(12) },
  buttonAdd: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  buttonTitleAdd: {
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: scaleFont(16),
  },
});
