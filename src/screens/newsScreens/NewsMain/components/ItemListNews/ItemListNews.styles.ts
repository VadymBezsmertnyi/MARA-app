import { Platform, StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingTop: 16,
    paddingRight: 25,
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: colors.grayShadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  containerTitles: {
    fontSize: 18,
    gap: 10,
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  subTitle: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
});
