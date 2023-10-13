import { StyleSheet } from 'react-native';
import colors from '../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: colors.grayCloudy, fontSize: 12, fontWeight: '600' },
  link: { color: colors.blueTest },
});
