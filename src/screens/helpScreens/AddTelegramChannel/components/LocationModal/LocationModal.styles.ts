import { Dimensions, StyleSheet } from "react-native";
import {
  horizontalScale,
  scaleFont,
  verticalScale,
} from "../../../../../../styles/hooks";
import colors from "../../../../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    width: WIDTH - horizontalScale(32),
    height: verticalScale(400),
    backgroundColor: colors.white,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(16),
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: colors.blueTufts,
  },
  disabledTab: {
    opacity: 0.5,
  },
  tabText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.gray,
  },
  activeTabText: {
    color: colors.blueTufts,
  },
  disabledTabText: {
    color: colors.gray,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(16),
    paddingVertical: verticalScale(12),
    color: colors.blackCoffee,
  },
  loading: {
    marginLeft: horizontalScale(12),
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
  },
  resultText: {
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    marginBottom: verticalScale(4),
  },
  resultSubText: {
    fontSize: scaleFont(14),
    color: colors.gray,
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(40),
  },
  noResultsText: {
    fontSize: scaleFont(16),
    color: colors.gray,
  },
});
