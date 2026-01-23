import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  footerButtonBlurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    width: "90%",
    borderRadius: 20,
    backgroundColor: colors.lightOrange,
    shadowColor: "rgba(85, 39, 0, 0.70)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    paddingBottom: 37,
    alignItems: "center",
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  containerImage: {
    width: 160,
    height: 160,
    borderRadius: 200,
  },
  containerButtons: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
    paddingHorizontal: 30,
  },
  buttonModal: { flex: 1, height: 36 },
});
