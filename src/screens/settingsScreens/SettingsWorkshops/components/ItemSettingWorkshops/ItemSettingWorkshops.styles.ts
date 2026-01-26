import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";
import { horizontalScale } from "../../../../../../styles/hooks";
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
    flex: 1,
    flexShrink: 1,
  },
  image: { width: 73, height: 73, borderRadius: 3 },
  containerInfo: {
    justifyContent: "space-between",
    flex: 1,
    flexShrink: 1,
  },
  title: {
    width: horizontalScale(250),
    fontFamily: FONT_600_OPEN_SANS,
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
    flexShrink: 0,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 10,
    color: colors.blackCoffee,
  },
  notComments: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.grayCloudy,
  },
  containerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONT_600_OPEN_SANS,
  },
  statusPending: {
    backgroundColor: colors.yellow,
  },
  statusVerified: {
    backgroundColor: colors.green,
  },
  statusRejected: {
    backgroundColor: colors.errorRed,
  },
  statusTextPending: {
    color: colors.blackCoffee,
  },
  statusTextVerified: {
    color: colors.white,
  },
  statusTextRejected: {
    color: colors.white,
  },
  reasonText: {
    fontSize: 9,
    color: colors.errorRed,
    marginTop: 2,
    fontStyle: "italic",
    flexShrink: 1,
    maxWidth: horizontalScale(250),
  },
});
