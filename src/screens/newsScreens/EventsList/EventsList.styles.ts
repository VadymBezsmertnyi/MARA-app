import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  title: {
    color: colors.blackRich,
    fontSize: 20,
    fontWeight: '700',
  },
});
