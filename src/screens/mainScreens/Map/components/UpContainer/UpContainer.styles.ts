import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const MIN_HEIGHT = 44;

const SOS_PADDING_HORIZONTAL = 16;
const SOS_PADDING_VERTICAL = 3;

export const styles = StyleSheet.create({
  containerUp: {
    position: "absolute",
    width: "100%",
    minHeight: verticalScale(MIN_HEIGHT),
    top: verticalScale(12),
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(SOS_PADDING_HORIZONTAL),
    paddingVertical: verticalScale(SOS_PADDING_VERTICAL),
    gap: 13,
  },
  sosContainer: {
    backgroundColor: colors.sosRed,
  },
  buttonSos: { height: "100%", justifyContent: "center" },
  titleButtonSos: {
    fontFamily: "OpenSans_700Bold",
    color: colors.white,
  },
});
