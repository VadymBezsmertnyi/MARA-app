import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    gap: 10,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsHeaderLeft: {
    width: "30%",
  },
  buttonsHeaderRight: {
    width: "30%",
    alignItems: "flex-end",
  },
  titleDelete: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.grayCloudy,
  },
  titleHeader: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 17,
    color: colors.blackCoffee,
  },
  titleLogout: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerInputs: {
    gap: 30,
  },
  containerInput: { marginTop: 0 },
  labelInput: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
    color: colors.grayFuscous,
  },
  containerAvatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  containerImage: {
    width: 84,
    height: 84,
    borderRadius: 40,
  },
  buttonPickImage: { position: "absolute", bottom: 8, right: 8 },
  buttonDeleteImage: { position: "absolute", bottom: 8, left: 8 },
});
