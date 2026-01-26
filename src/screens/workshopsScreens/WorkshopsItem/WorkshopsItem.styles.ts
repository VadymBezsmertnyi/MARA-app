import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: { gap: 8 },
  containerEmpty: { height: 190 },
  containerMain: { gap: 8, width: "100%" },
  containerInfo: { gap: 6, width: "100%", paddingHorizontal: 12 },
  containerSlider: {
    height: 200,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    marginBottom: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  imagesScroll: { borderRadius: 12, backgroundColor: colors.transparent },
  info: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titles: { flex: 1, gap: 4 },
  titleInfo: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 18,
    color: colors.blackCoffee,
  },
  subTitleInfo: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 13,
    color: colors.grayCloudy,
  },
  geoDisabledText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 11,
    color: colors.grayCloudy,
    paddingHorizontal: 4,
  },
  containerDistance: {
    justifyContent: "flex-end",
  },
  containerContacts: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  containerContactsList: {
    flex: 1,
    gap: 8,
  },
  containerContact: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  containerPhone: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    flex: 1,
  },
  containerIcon: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: colors.blazeOrange70,
  },
  titlePhone: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 14,
    color: colors.blackCoffee,
    flex: 1,
  },
  titlePhoneUnknown: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.grayCloudy,
    fontStyle: "italic",
  },
  containerIconsService: {
    flexDirection: "row",
  },
  autoIcon: { left: 22 },
  containerMap: {
    height: 280,
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  containerDescription: {
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  titleDescription: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 15,
    color: colors.blackCoffee,
  },
  description: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
    lineHeight: 20,
  },
  buttonDescription: {
    justifyContent: "flex-end",
  },
  titleButtonDescription: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    bottom: -8,
    color: colors.blueTufts,
  },
  containerConfirmOwnership: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.lightOrange,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  confirmOwnershipText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
    flex: 1,
  },
  buttonConfirmOwnership: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.californiaOrange,
    borderRadius: 4,
  },
  buttonConfirmOwnershipText: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 12,
    color: colors.white,
  },
  containerReport: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
    alignItems: "flex-end",
  },
  buttonReport: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.errorRed,
    borderRadius: 4,
  },
  buttonReportText: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 11,
    color: colors.white,
  },
});
