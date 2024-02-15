import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

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
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
});
