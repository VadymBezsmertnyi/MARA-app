import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRightHeader: { width: horizontalScale(70) },
  containerMain: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120),
  },
});
