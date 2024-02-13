import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  containerList: {
    flexGrow: 1,
    justifyContent: "space-between",
    gap: 11,
    paddingTop: 8,
    paddingBottom: 208,
    paddingHorizontal: 16,
  },
  columnContainerList: {
    gap: 11,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    flex: 1,
    borderRadius: 10,
  },
});
