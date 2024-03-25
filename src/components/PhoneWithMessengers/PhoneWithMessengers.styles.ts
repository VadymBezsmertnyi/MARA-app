import { StyleSheet } from "react-native";
import { FONT_600_OPEN_SANS } from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontFamily: FONT_600_OPEN_SANS, fontSize: 16 },
  containerMessengers: { flexDirection: "row" },
  secondIcon: { left: 9 },
  thirdIcon: { left: 18 },
});
