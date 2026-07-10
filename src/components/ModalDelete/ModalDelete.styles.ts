import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    maxHeight: "80%",
  },
  containerModal: {
    borderRadius: horizontalScale(20),
    backgroundColor: colors.lightOrange,
    padding: horizontalScale(16),
    paddingBottom: verticalScale(37),
    alignItems: "center",
  },
  containerClose: {
    width: "100%",
    alignItems: "flex-end",
  },
  titleModal: {
    fontFamily: FONT_600_OPEN_SANS,
    color: colors.blackCoffee,
    fontSize: scaleFont(16),
    textAlign: "center",
    marginTop: verticalScale(16),
  },
  subTitleModal: {
    fontFamily: FONT_400_OPEN_SANS,
    color: colors.errorRed,
    fontSize: scaleFont(12),
    textAlign: "center",
    marginTop: verticalScale(8),
  },
  containerButtons: {
    marginTop: verticalScale(40),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: horizontalScale(20),
    paddingHorizontal: horizontalScale(30),
  },
  buttonModal: { flex: 1, height: verticalScale(36) },
});
