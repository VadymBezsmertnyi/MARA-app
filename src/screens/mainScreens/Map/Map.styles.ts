import { Platform, StyleSheet } from "react-native";

// hooks
import { verticalScale } from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:
      Platform.OS === "android" ? verticalScale(70) : verticalScale(80),
  },
  map: {
    flex: 1,
  },
  containerClusterUser: { width: 200 },
});
