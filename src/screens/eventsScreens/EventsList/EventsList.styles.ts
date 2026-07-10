import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, gap: 12 },
  title: {
    color: colors.blackRich,
    fontSize: 20,
    fontWeight: "700",
  },
  containerScroll: { zIndex: -1 },
  containerList: {
    gap: 12,
  },
  createNewEvent: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
  createNewEventWrapper: {
    backgroundColor: colors.whiteTransparentFifteen,
    width: 72,
    height: 72,
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
});
