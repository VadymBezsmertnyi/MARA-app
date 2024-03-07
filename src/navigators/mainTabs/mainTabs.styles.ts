import { Platform, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

// hooks
import { horizontalScale, verticalScale } from "../../../styles/hooks";

const PADDING_HORIZONTAL = 16;
const PADDING_VERTICAL = 3;

export const styles = StyleSheet.create({
  mainContainer: { position: "absolute", width: "100%" },
  absoluteContainer: { position: "absolute", bottom: 0, width: "100%" },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingBottom:
      Platform.OS === "android"
        ? verticalScale(10)
        : getBottomSpace() - verticalScale(10),
  },
  linearGradient: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    padding: 2,
  },
  headerLeftContainerStyle: {
    paddingLeft: horizontalScale(PADDING_HORIZONTAL),
    paddingVertical: verticalScale(PADDING_VERTICAL),
  },
  headerRightContainerStyle: {
    paddingRight: horizontalScale(PADDING_HORIZONTAL),
  },
  button: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
});
