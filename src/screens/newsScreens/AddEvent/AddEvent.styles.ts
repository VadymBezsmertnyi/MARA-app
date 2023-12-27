import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
  },
  inner: {
    flex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.blackRich,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.blackCoffee,
    marginTop: 20,
  },
  multipleInput: {
    height: 110,
    width: "100%",
  },
  containerImages: {
    marginBottom: 40,
    gap: 12,
  },
  containerLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buttonLocation: { flex: 1 },
  buttonMap: { paddingTop: 16, paddingLeft: 12, paddingBottom: 8 },
});
