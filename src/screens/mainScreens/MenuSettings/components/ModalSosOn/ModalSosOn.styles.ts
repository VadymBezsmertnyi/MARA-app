import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../../../styles/constants";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("screen").height;

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    maxWidth: WIDTH - 40,
    maxHeight: HEIGHT - 300,
    borderRadius: 20,
    backgroundColor: colors.lightOrange,
    paddingVertical: 16,
    gap: 10,
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  containerScroll: {
    paddingHorizontal: 16,
  },
  titleModal: {
    fontFamily: FONT_700_MONTSERRAT,
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
    fontFamily: FONT_600_OPEN_SANS,
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
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: 16,
  },
  containerInputs: {
    gap: 5,
  },
  labelInputContacts: {
    fontFamily: FONT_600_OPEN_SANS,
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
    fontFamily: FONT_400_OPEN_SANS,
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
