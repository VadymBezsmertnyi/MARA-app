import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  containerModalType: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  titleModalType: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineModalType: { width: "100%", height: 1, marginTop: 16, marginBottom: 24 },
  containerSelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  titleSelect: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerRightSelect: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
