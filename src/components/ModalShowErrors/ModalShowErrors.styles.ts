import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../styles/constants";

export const styles = StyleSheet.create({
  containerModal: {
    width: "90%",
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
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
});
