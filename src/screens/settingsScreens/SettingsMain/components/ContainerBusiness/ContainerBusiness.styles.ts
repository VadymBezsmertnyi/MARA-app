import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
    color: colors.grayCloudy,
  },
  containerButton: {
    height: "auto",
  },
  linearContainerButton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
  },
  titleButton: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    color: colors.white,
  },
});
