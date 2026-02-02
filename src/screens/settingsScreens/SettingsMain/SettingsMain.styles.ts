import { Platform, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";
import { horizontalScale, verticalScale } from "../../../../styles/hooks";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonsHeaderLeft: {
    width: "30%",
  },
  buttonsHeaderRight: {
    width: "30%",
    alignItems: "flex-end",
  },
  titleDelete: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.grayCloudy,
  },
  titleHeader: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
    color: colors.grayCloudy,
  },
  titleLogout: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 16,
    color: colors.blackCoffee,
  },
  containerLineEmpty: {
    width: "100%",
    height: 1,
    backgroundColor: colors.grayMercury,
  },
  containerEmpty: {
    height: 100,
  },
  containerList: {},
  containerFooter: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
    gap: verticalScale(10),
  },
  profileSections: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    color: "#333",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: "#007AFF",
    marginRight: 4,
  },
  sectionItems: {
    gap: 8,
  },
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  subItemsContainer: {
    gap: 2,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  subItemIcon: {
    marginRight: 6,
  },
  subItemText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 12,
    color: "#666",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  itemCount: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  loadingText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: "#666",
  },
});
