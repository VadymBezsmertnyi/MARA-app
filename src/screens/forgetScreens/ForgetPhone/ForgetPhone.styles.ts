import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  containerMain: { flex: 1 },
  containerTitles: { gap: 16 },
  title: { color: colors.blackCoffee, fontSize: 28, fontWeight: '700' },
  subTitle: { color: colors.blackCoffee, fontSize: 16, fontWeight: '600' },
  containerInput: { marginTop: 32 },
  colorWhite: { color: colors.white },
});
