import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    gap: 10,
  },
  containerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  containerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  buttonAddPhoto: {
    borderRadius: 8,
    backgroundColor: colors.DavysGray,
    paddingVertical: 10,
    alignItems: "center",
  },
  titleButtonAddPhoto: {
    color: colors.white,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerEvents: {
    gap: 5,
  },
  containerEvent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonDeleteEvent: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 8,
  },
  titleButtonDeleteEvent: {
    color: colors.white,
  },
});
