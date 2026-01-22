import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import {
  FONT_400_OPEN_SANS,
  FONT_600_OPEN_SANS,
} from "../../../styles/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  containerHeader: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 11,
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  buttonBack: {
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: FONT_400_OPEN_SANS,
    fontSize: 17,
  },
  title: {
    fontFamily: FONT_600_OPEN_SANS,
    fontSize: 17,
  },
  containerEmpty: { width: 70 },
  containerGallery: {
    backgroundColor: colors.transparent,
    flex: 1,
  },
  containerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
