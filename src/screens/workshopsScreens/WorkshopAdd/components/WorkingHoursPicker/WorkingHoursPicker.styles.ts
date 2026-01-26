import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../../../styles/colors";
import {
  FONT_600_OPEN_SANS,
  FONT_600_MONTSERRAT,
  FONT_700_MONTSERRAT,
} from "../../../../../../styles/constants";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    marginTop: 0,
  },
  label: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
    marginBottom: 5,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.grayCloudy,
    borderRadius: 4,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    minHeight: 50,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scheduleText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
    flex: 1,
    lineHeight: 24,
  },
  editButton: {
    paddingLeft: 12,
  },
  editButtonText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.californiaOrange,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.platinumGray,
  },
  dayLabel: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: scaleFont(14),
    color: colors.blackCoffee,
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timePicker: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: colors.blackCoffee,
  },
  timeSeparator: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
    marginHorizontal: 8,
  },
  errorText: {
    fontFamily: FONT_700_MONTSERRAT,
    fontSize: 10,
    color: colors.errorRed,
    marginTop: 4,
    minHeight: 20,
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  buttonBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerBlur: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.8,
    backgroundColor: colors.white,
    borderRadius: horizontalScale(16),
    overflow: "hidden",
    justifyContent: "space-between",
  },
  modalHeader: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
  },
  modalTitle: {
    fontFamily: FONT_600_MONTSERRAT,
    fontSize: scaleFont(18),
    color: colors.grayFuscous,
    marginBottom: verticalScale(8),
  },
  modalLine: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(8),
  },
  modalFooterContent: {
    paddingTop: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    paddingBottom: verticalScale(12),
    gap: verticalScale(12),
  },
});
