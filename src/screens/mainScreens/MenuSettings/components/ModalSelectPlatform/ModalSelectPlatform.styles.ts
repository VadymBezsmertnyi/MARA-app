import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: colors.lightOrange,
    padding: 16,
    paddingBottom: 37,
    alignItems: "center",
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  titleModal: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  containerButtons: {
    flexDirection: "row",
    gap: 9,
    paddingTop: 20,
  },
  containerButton: { flex: 1 },
  containerBoxButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  titleButton: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: colors.blazeOrange,
  },
});
