import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

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
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 20,
  },
  containerElements: {
    paddingHorizontal: 16,
    gap: 12,
  },
  boxHeaderEmpty: {
    width: 24,
  },
  titleHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
    color: colors.blackCoffee,
  },
  containerFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonAdd: {
    flexDirection: "row",
    gap: 10,
  },
  titleAdd: {
    color: colors.white,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
});
