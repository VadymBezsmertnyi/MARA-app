import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  background: {
    borderRadius: 32,
    elevation: 8,
    shadowOffset: { width: 0, height: -17.4 / 2 },
    shadowRadius: 17.4 / 2,
    shadowOpacity: 0.15,
  },
  handleIndicator: {
    display: "none",
  },
  content: {
    flex: 1,
  },
  scrollViewContainer: {
    width: WIDTH,
  },
});

export default styles;
