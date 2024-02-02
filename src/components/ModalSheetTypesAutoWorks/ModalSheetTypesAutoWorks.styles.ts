import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  containerModalTypeWork: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  containerHeaderTypeWork: {
    paddingHorizontal: 16,
  },
  titleModalType: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: colors.grayFuscous,
  },
  lineModalType: { width: "100%", height: 1, marginTop: 16, marginBottom: 13 },
  containerTypesWork: {
    gap: 24,
    paddingHorizontal: 16,
  },
  containerTypeWork: {
    flexDirection: "row",
    gap: 51,
  },
  containerTitlesTypeWork: {
    flex: 1,
    gap: 6,
  },
  titleTypeWork: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  subTitleTypeWork: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
  },
  containerSubmitModalTypeWork: {
    padding: 24,
    paddingBottom: 0,
  },
});
