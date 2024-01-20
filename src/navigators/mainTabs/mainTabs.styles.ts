import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../styles/hooks";

const PADDING_HORIZONTAL = 16;
const PADDING_VERTICAL = 3;

export const styles = StyleSheet.create({
  mainContainer: { position: "absolute", width: "100%", height: 74 },
  absoluteContainer: { position: "absolute", bottom: 0, width: "100%" },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
    paddingHorizontal: 27,
    paddingVertical: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
});
