import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  wrapper: {
    paddingTop: 10,
    paddingBottom: 13,
  },
  title: {
    fontSize: 16,
    color: colors.blackCoffee,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.blackCoffee,
    textAlign: 'center',
    marginTop: 10,
  },
});
