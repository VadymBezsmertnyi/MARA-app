import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  containerHeader: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 11,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  buttonBack: {
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 17,
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
  },
  containerEmpty: { width: 70 },
  containerGallery: { backgroundColor: colors.transparent },
  containerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
