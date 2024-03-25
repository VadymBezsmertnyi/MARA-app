import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    paddingVertical: 8,
    paddingLeft: 4,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 8,
    maxWidth: 60,
  },
  image: { width: "100%", borderRadius: 3 },
  containerCenter: {
    flex: 1,
    gap: 12,
  },
  containerInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  containerViews: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  titleViews: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.grayCloudy,
  },
  containerRight: {
    justifyContent: "center",
  },
});
