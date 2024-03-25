import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { FONT_600_OPEN_SANS } from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  linearGradient: {
    borderRadius: 5,
  },
  containerMain: {
    flex: 1,
    margin: 1,
    borderRadius: 4,
    backgroundColor: colors.white,
    padding: 6,
    gap: 10,
  },
  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  containerImage: {
    width: 24,
    height: 24,
    borderRadius: 40,
    overflow: "hidden",
  },
  title: { fontFamily: FONT_600_OPEN_SANS, fontSize: 12, width: 110 },
  image: {
    flex: 1,
    width: 24,
    height: 24,
    backgroundColor: colors.grayMercury,
  },
  containerSubTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
  },
  containerArrow: {
    position: "absolute",
    bottom: 8,
    left: "43%",
    width: 26,
    height: 26,
    transform: [{ rotate: "45deg" }],
  },
  containerIcons: {
    flexDirection: "row",
  },
  bodyArrow: {
    flex: 1,
    backgroundColor: "white",
    margin: -1,
    marginBottom: 1,
    marginRight: 1,
  },
  containerEmpty: { height: 20 },
});
