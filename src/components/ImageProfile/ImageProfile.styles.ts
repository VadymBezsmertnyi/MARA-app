import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    borderRadius: 40,
  },
  containerImage: {
    width: 84,
    height: 84,
    borderRadius: 40,
  },
  buttonPickImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.grayMercury,
    padding: 6,
    borderRadius: 40,
  },
});
