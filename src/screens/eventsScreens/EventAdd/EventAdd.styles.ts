import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../styles/hooks";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: verticalScale(10),
  },
  scrollView: {
    paddingHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(16),
    paddingTop: verticalScale(6),
    gap: verticalScale(8),
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: horizontalScale(8),
  },
  containerPrices: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  lineInputs: {
    width: horizontalScale(13),
    height: verticalScale(1),
    backgroundColor: colors.black,
  },
  inner: {
    flex: 2,
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: "700",
    color: colors.blackRich,
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
  },
  labelInput: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  labelContacts: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.blackCoffee,
    marginBottom: verticalScale(4),
  },
  contactsContainer: {
    paddingVertical: verticalScale(10),
  },
  contactsListContainer: {
    paddingHorizontal: horizontalScale(5),
  },
  multipleInput: {
    height: verticalScale(110),
    width: "100%",
  },
  containerLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  buttonLocation: { flex: 1 },
  buttonMap: {
    paddingTop: verticalScale(16),
    paddingLeft: horizontalScale(12),
    paddingBottom: verticalScale(8),
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(10),
    gap: horizontalScale(8),
  },
  contactInputContainer: {
    flex: 1,
  },
  deleteContactIconButton: {
    marginTop: verticalScale(25),
    padding: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  addContactButtonContainer: {
    marginTop: 0,
    height: "auto",
  },
  addContactButton: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    minWidth: 0,
    height: "auto",
  },
  addContactText: {
    fontSize: scaleFont(14),
    color: colors.grayFuscous,
  },
  errorMessage: { textAlign: "center", color: colors.errorRed },
  empty: {
    height: verticalScale(200),
  },
});
