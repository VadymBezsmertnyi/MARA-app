import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 40,
  },
  containerHeader: { justifyContent: "center" },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    textAlign: "center",
  },
  containerInputs: { gap: 30 },
  containerButton: { gap: 16 },
});
