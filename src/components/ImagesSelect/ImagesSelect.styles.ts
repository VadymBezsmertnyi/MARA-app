import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const PREVIEW_SIZE = 120;
const SEPARATOR_WIDTH = 12;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  separator: {
    width: SEPARATOR_WIDTH,
  },
  image: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: 8,
  },
  addButton: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: 8,
    backgroundColor: colors.grayMercury,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SEPARATOR_WIDTH,
  },
});
