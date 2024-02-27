import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    maxWidth: WIDTH - 40,
    maxHeight: HEIGHT - 300,
    borderRadius: 20,
    backgroundColor: colors.lightOrange,
    padding: 16,
    paddingBottom: 37,
    gap: 10,
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  titleModal: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    textAlign: "center",
  },
  containerPermissionsInfo: {
    gap: 5,
  },
  linePermissionsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titlePermissionsInfo: {
    width: WIDTH - 120,
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  pointOn: {
    width: 16,
    height: 16,
    backgroundColor: colors.green,
    borderRadius: 40,
  },
  pointOff: {
    width: 16,
    height: 16,
    backgroundColor: colors.errorRed,
    borderRadius: 40,
  },
  containerCheckbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleDarkTheme: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.blackCoffee,
    fontSize: 16,
  },
  containerInputs: {
    gap: 5,
  },
  labelInputContacts: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerInput: {
    backgroundColor: colors.transparent,
    marginTop: 0,
    padding: 0,
  },
  errorStyleInput: { height: 0, paddingBottom: 0 },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: { flex: 1 },
  titleInf: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.errorRed,
    textAlign: "center",
  },
  containerLoading: {
    position: "absolute",
    backgroundColor: colors.white70,
    width: "110%",
    height: "110%",
    borderRadius: 20,
  },
});
