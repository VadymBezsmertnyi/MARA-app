import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { horizontalScale } from "../../../../../../styles/hooks";

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
  image: { width: 73, height: 73, borderRadius: 3 },
  containerInfo: {
    justifyContent: "space-between",
  },
  title: {
    width: horizontalScale(250),
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  containerIcons: {
    flexDirection: "row",
  },
  moto: {},
  auto: {},
  containerRating: {
    flexDirection: "row",
    gap: 18,
  },
  containerRight: {
    justifyContent: "center",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 10,
    color: colors.blackCoffee,
  },
  notComments: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.grayCloudy,
  },
});
