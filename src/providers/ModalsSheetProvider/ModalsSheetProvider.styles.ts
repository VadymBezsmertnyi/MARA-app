import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: { alignItems: "flex-end" },
  buttonHeader: {
    paddingTop: 12,
    paddingBottom: 5,
    paddingHorizontal: 16,
  },
  footerButton: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  footerButtonBlurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerBlur: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
