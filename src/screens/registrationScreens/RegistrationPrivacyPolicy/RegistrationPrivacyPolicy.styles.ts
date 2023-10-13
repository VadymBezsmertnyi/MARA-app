import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 20,
  },
  containerTitle: {
    gap: 12,
  },
  firstTitle: {
    color: colors.blackCoffee,
    fontSize: 20,
    fontWeight: '700',
  },
  secondTitle: {
    color: colors.grayFuscous,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
    lineHeight: 24,
  },
  containerSubTitle: { gap: 12 },
  firstSubTitle: { color: colors.blackCoffee, fontSize: 16, fontWeight: '600' },
  secondSubTitle: {
    color: colors.grayCod,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.6,
    lineHeight: 24,
  },
  colorWhite: { color: colors.white },
});
