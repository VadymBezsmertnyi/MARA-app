import { StyleSheet } from "react-native";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: "#007AFF",
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
  sectionItems: {
    gap: 4,
  },
  sectionTouchable: {
    borderRadius: 8,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  itemIcon: {
    width: 20,
    height: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  subItemsContainer: {
    marginTop: 8,
    gap: 4,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subItemIcon: {
    width: 16,
    height: 16,
  },
  subItemText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
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
    fontWeight: "600",
    color: "#666",
  },
});
