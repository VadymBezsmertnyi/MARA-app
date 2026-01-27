import { StyleSheet } from "react-native";
import colors from "../../../../../../styles/colors";

export const styles = StyleSheet.create({
  backgroundButton: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "110%",
    height: "100%",
  },
  container: {
    gap: 12,
  },
  mainContainer: {
    zIndex: 1,
    height: 40,
  },
  selectContainer: {
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
  },
  selectContainerOpen: {
    zIndex: 100,
    position: "absolute",
    width: "100%",
    maxHeight: 200,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 4,
    paddingRight: 16,
    paddingLeft: 12,
  },
  titleInput: {
    color: colors.blackCoffee,
  },
  input: {
    flex: 1,
    padding: 8,
    paddingLeft: 0,
  },
  arrowToUp: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownList: {
    zIndex: 100,
    backgroundColor: colors.white,
    maxHeight: 200,
  },
  dropdownListContent: {
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  noResultsText: {
    padding: 10,
    textAlign: "center",
  },
});
