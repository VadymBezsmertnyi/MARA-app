import { Platform, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  createNewEvent: {
    position: "absolute",
    right: 15,
    bottom: 90,
    shadowColor: colors.grayShadow,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  createNewEventWrapper: {
    backgroundColor: colors.whiteTransparentFifteen,
    width: 72,
    height: 72,
    overflow: "hidden",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 20,
    shadowOpacity: 0.3,
  },
  horizontal: {
    width: 40,
    height: 5,
    borderRadius: 8,
    backgroundColor: colors.californiaOrange,
  },
  vertical: {
    width: 5,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.californiaOrange,
    position: "absolute",
    right: 33,
    top: 17,
  },
  blurViewContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
