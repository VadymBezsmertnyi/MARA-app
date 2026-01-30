import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const styles = StyleSheet.create<{
  container: ViewStyle;
  map: ViewStyle;
  containerClusterUser: ViewStyle;
  statusContainer: ViewStyle;
  statusText: TextStyle;
}>({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  containerClusterUser: { width: 200 },
  statusContainer: {
    position: "absolute",
    top: 12,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  statusText: {
    fontSize: 13,
    color: "#1B1B1B",
    marginLeft: 8,
  },
});
