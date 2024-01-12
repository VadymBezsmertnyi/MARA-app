import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700" },
  image: { width: "100%", height: "100%" },
  containerLogo: {
    position: "absolute",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    width: 142,
    height: 84,
  },
  titleLogo: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 32,
  },
});
