import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    gap: 10,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsHeaderLeft: {
    width: "30%",
  },
  buttonsHeaderRight: {
    width: "30%",
    alignItems: "flex-end",
  },
  titleDelete: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.grayCloudy,
  },
  titleHeader: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
    color: colors.blackCoffee,
  },
  titleLogout: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerInputs: {
    gap: 30,
  },
  containerInput: { marginTop: 0 },
  labelInput: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.grayFuscous,
  },
  containerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 20,
  },
  email: { fontFamily: FONT_600_OPEN_SANS, fontSize: 16 },
});
