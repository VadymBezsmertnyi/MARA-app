import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 9,
  },
  containerTabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  tabActive: {
    backgroundColor: colors.californiaOrange,
  },
  tabText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
  tabTextActive: {
    color: colors.white,
  },
  containerNotElements: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  imageNotElements: {
    width: "100%",
    height: "50%",
  },
  titlesNotElements: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleNotElements: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 20,
  },
  containerElements: {
    paddingHorizontal: 16,
  },
  boxHeaderEmpty: {
    width: 24,
  },
  titleHeader: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
    color: colors.blackCoffee,
  },
  containerFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  containerButtonAdd: {
    marginTop: 20,
  },
  buttonAdd: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  titleAdd: {
    color: colors.white,
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
  },
});
