import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  containerBody: {
    flex: 1,
  },
  containerTitle: {
    paddingTop: 64,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    textAlign: "center",
  },
  containerLocation: {
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleLocation: {
    fontFamily: "OpenSans_400Regular",
    color: colors.grayFuscous,
    maxWidth: 203,
    fontSize: 16,
  },
  containerCity: {
    paddingTop: 60,
    gap: 20,
  },
  titleCity: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    textAlign: "center",
  },
  inputCity: {
    borderColor: colors.californiaOrange,
  },
  containerFooter: {
    gap: 20,
  },
  titleTermsPolicy: {
    fontFamily: "OpenSans_600SemiBold",
    color: colors.grayCloudy,
    textAlign: "center",
    fontSize: 12,
  },
  linkTermsPolicy: {
    color: colors.blueTufts,
  },
});
