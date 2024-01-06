import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { backgroundColor: "purl" },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});
