import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";

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
    backgroundColor: colors.lightOrange, // Використовуйте кольори в форматі rgba для прозорості
    shadowColor: "rgba(85, 39, 0, 0.70)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1, // Підганяйте opacity за потребою
    shadowRadius: 10,
    elevation: 5, // Для Android, задає тінь
    padding: 16,
    paddingBottom: 37,
    alignItems: "center",
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  titleModal: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: 16,
  },
  subTitleModal: {
    fontFamily: FONT_400_OPEN_SANS,
    color: colors.errorRed,
    fontSize: 12,
    textAlign: "center",
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
