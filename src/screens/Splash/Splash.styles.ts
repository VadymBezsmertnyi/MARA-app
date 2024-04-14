import { Dimensions, StyleSheet } from "react-native";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700" },
  image: { width: WIDTH, height: HEIGHT, position: "absolute", bottom: 0 },
});
