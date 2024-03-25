import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    paddingVertical: 8,
    paddingLeft: 4,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 68,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  image: { width: 60, height: 52, borderRadius: 3 },
  containerInfo: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
  },
  data: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
  },
  containerRight: {
    justifyContent: "center",
  },
});
