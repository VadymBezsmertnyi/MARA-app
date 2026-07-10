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
    height: verticalScale(450),
    backgroundColor: colors.white,
    borderRadius: verticalScale(16),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: verticalScale(8),
    elevation: 8,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(16),
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    position: "relative",
  },
  activeTab: {
    borderBottomColor: colors.blueTufts,
  },
  selectedTab: {
    backgroundColor: colors.blueLight,
  },
  disabledTab: {
    opacity: 0.4,
  },
  tabText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: colors.grayFuscous,
  },
  activeTabText: {
    color: colors.blueTufts,
    fontWeight: "700",
  },
  selectedTabText: {
    color: colors.blueTufts,
    fontWeight: "700",
  },
  disabledTabText: {
    color: colors.grayCloudy,
  },
  selectedIndicator: {
    color: colors.blueTufts,
    fontWeight: "700",
    fontSize: scaleFont(14),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(16),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    color: colors.blackCoffee,
    backgroundColor: colors.grayMercury,
    borderRadius: verticalScale(8),
    borderWidth: 1,
    borderColor: colors.grayMercury,
  },
  loading: {
    marginLeft: horizontalScale(12),
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  resultItem: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayMercury,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  selectedResultItem: {
    backgroundColor: colors.blueLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.blueTufts,
  },
  resultContent: {
    flex: 1,
  },
  resultText: {
    fontSize: scaleFont(16),
    color: colors.blackCoffee,
    marginBottom: verticalScale(4),
    fontWeight: "500",
  },
  selectedResultText: {
    color: colors.blueTufts,
    fontWeight: "700",
  },
  resultSubText: {
    fontSize: scaleFont(14),
    color: colors.grayCloudy,
    marginBottom: verticalScale(2),
  },
  selectedResultSubText: {
    color: colors.blueTufts,
    fontWeight: "500",
  },
  resultCountryText: {
    fontSize: scaleFont(13),
    color: colors.gray,
    fontStyle: "italic",
  },
  checkmark: {
    fontSize: scaleFont(18),
    color: colors.blueTufts,
    fontWeight: "700",
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(40),
  },
  noResultsText: {
    fontSize: scaleFont(16),
    color: colors.grayCloudy,
    textAlign: "center",
  },
});
