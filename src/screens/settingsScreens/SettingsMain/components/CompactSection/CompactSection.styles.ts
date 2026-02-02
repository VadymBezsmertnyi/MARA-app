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
    marginBottom: 16,
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
  itemsContainer: {
    gap: 8,
  },
  itemTouchable: {
    borderRadius: 8,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
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
  itemText: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
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
  subItemsContainer: {
    marginTop: 8,
    paddingLeft: 32,
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
});
