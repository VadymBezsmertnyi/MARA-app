import { StyleSheet } from "react-native";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../../../../styles/constants";

export const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
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
  contentContainer: {
    gap: 8,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  categoryContainer: {
    borderRadius: 8,
    padding: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 20,
    height: 20,
  },
  categoryText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  subItemsContainer: {
    gap: 4,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  subItemIcon: {
    width: 14,
    height: 14,
  },
  subItemText: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 14,
    color: "#666",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  bottomItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 12,
  },
  bottomItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottomItemIcon: {
    width: 20,
    height: 20,
  },
  bottomItemText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  bottomItemCount: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
