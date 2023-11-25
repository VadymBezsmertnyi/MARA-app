import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 16,
    paddingLeft: 12,
  },
  input: { flex: 1, padding: 8, paddingLeft: 0 },
  arrowToUp: { transform: [{ rotate: '180deg' }] },
});
