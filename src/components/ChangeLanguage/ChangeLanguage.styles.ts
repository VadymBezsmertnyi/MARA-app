import { Platform, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

// colors
import colors from "../../../styles/colors";

// hooks
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../styles/hooks";

export const styles = StyleSheet.create({
  buttonLanguage: {
    flexDirection: "row",
    gap: horizontalScale(8),
    alignItems: "center",
  },
  iconLanguage: { width: horizontalScale(24), height: verticalScale(24) },
  titleLanguage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: scaleFont(16),
    textTransform: "uppercase",
    color: colors.blackCoffee,
  },
  containerModal: { flex: 1, position: "relative" },
  headerModal: { paddingHorizontal: horizontalScale(16) },
  titleModal: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: scaleFont(16),
    color: colors.grayFuscous,
  },
  lineHeader: {
    width: "100%",
    height: verticalScale(1),
    marginTop: verticalScale(16),
  },
  titleInput: {
    paddingHorizontal: horizontalScale(8),
  },
  containerInput: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(14),
  },
  wrapperInput: {
    paddingRight: horizontalScale(20),
  },
  containerScroll: {
    paddingHorizontal: horizontalScale(24),
    paddingTop: verticalScale(38),
  },
  containerItemList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    minHeight: horizontalScale(40),
  },
  titleItemList: {
    fontFamily: "OpenSans_400Regular",
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
  },
  containerEmpty: {
    height: verticalScale(20),
  },
  containerButtons: {
    paddingTop: verticalScale(24),
    paddingHorizontal: horizontalScale(12),
    paddingBottom: verticalScale(Platform.OS === "ios" ? getBottomSpace() : 24),
  },
});
