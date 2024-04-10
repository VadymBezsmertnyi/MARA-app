import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    width: 200,
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  containerButton: {
    flex: 1,
    height: 40,
  },
});
