import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  containerBody: { alignItems: 'center', gap: 44 },
  title: { color: colors.blackCoffee, fontWeight: '600', fontSize: 16 },
  containerButtons: {
    paddingBottom: 20,
  },
  colorWhite: { color: colors.white },
});
