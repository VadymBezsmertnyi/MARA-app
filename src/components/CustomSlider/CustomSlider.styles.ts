import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
  },
  image: {
    width: 200,
    height: "100%",
  },
  buttons: {
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    margin: 3,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#ccc",
    opacity: 0.9,
  },
  buttonSelected: {
    opacity: 1,
    backgroundColor: "#fff",
  },
});
