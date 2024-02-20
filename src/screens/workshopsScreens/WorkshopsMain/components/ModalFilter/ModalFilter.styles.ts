import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

const WIDTH = Dimensions.get("screen").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOrange,
    gap: 20,
  },
  headerBackground: {
    backgroundColor: colors.lightOrange,
  },
  containerRightHeader: {
    minWidth: 90,
  },
  containerBody: {
    paddingLeft: 20,
    paddingRight: 16,
    gap: 20,
  },
  containerStyleInputButton: {
    backgroundColor: colors.transparent,
    marginTop: 0,
  },
  inputWrapperStyleInputButton: {
    backgroundColor: colors.white,
    paddingRight: 0,
  },
  labelSectors: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerSelectRatings: {
    gap: 12,
  },
  containerRatings: {
    flexDirection: "row",
    gap: 16,
  },
  containerRating: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  titleRating: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  titleSelectRating: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
    color: colors.white,
  },
  buttonSubmit: { marginHorizontal: 36, marginTop: 20 },
  containerModalType: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  titleModalType: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineModalType: { width: "100%", height: 1, marginTop: 16, marginBottom: 13 },
  containerSelect: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSelect: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
});
