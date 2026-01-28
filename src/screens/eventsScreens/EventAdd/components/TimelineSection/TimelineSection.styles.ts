import { StyleSheet } from "react-native";
import colors from "../../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(6),
    gap: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(4),
    paddingVertical: verticalScale(4),
  },
  addButtonText: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  emptyText: {
    fontSize: scaleFont(13),
    color: colors.grayFuscous,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.grayMercury,
    borderRadius: 10,
    padding: horizontalScale(10),
    gap: horizontalScale(8),
  },
  itemInfo: {
    flex: 1,
    gap: verticalScale(2),
  },
  itemTitle: {
    fontSize: scaleFont(14),
    color: colors.blackRich,
  },
  itemTime: {
    fontSize: scaleFont(12),
    color: colors.grayFuscous,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: horizontalScale(12),
    width: "90%",
    gap: verticalScale(8),
  },
  modalTitle: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  modalDescription: {
    height: verticalScale(70),
    width: "100%",
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: horizontalScale(8),
  },
  pickerItem: {
    flex: 1,
  },
  finishToggle: {
    alignSelf: "flex-start",
    paddingVertical: verticalScale(4),
  },
  finishToggleText: {
    fontSize: scaleFont(13),
    color: colors.grayFuscous,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(4),
  },
  cancelText: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  saveButton: {
    height: "auto",
    minWidth: 0,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
  },
});
