import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_600_OPEN_SANS,
  FONT_700_MONTSERRAT,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  containerMain: { flex: 1 },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  imageWrapper: { marginBottom: 10, position: "relative" },
  image: {
    width: "100%",
    height: 185,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: colors.gray50,
  },
  buttonAllImage: {
    position: "absolute",
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    right: 12,
    bottom: 10,
  },
  titleAllImage: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.californiaOrange,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  locationTitle: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
    width: "75%",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 2,
  },
  title: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 20,
    color: colors.blackCoffee,
  },
  titleOther: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  subtitle: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 12,
    color: colors.blackCoffee,
    marginTop: 12,
  },
  dateOfEvent: {
    marginTop: 20,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.lightOrange,
    shadowColor: colors.grayShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.8,
  },
  iconWrapperLightBlue: {
    backgroundColor: colors.blueLight,
  },
  description: { marginTop: 10 },
  buttonFullDescription: {
    justifyContent: "flex-end",
  },
  fullTextTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.blueTufts,
  },
  mapWrapper: { height: 400, marginTop: 20 },
  gallery: {
    marginTop: 40,
    gap: 8,
  },
  imageGallery: {
    width: 150,
    height: 132,
    marginRight: 4,
    borderRadius: 3,
  },
  galleryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.californiaOrange,
    minWidth: 215,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  galleryButtonTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.californiaOrange,
    textAlign: "center",
  },
  containerEmpty: {
    height: 70,
  },
});
