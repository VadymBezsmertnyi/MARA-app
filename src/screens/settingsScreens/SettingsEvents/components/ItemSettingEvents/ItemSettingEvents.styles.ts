import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightOrange,
    borderRadius: 4,
    paddingVertical: 8,
    paddingLeft: 4,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 68,
  },
  containerLeft: {
    flexDirection: "row",
    gap: 8,
  },
  image: { width: 60, height: 52, borderRadius: 3 },
  containerInfo: {
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 16,
  },
  data: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
  },
  containerRight: {
    justifyContent: "space-between",
  },
});
