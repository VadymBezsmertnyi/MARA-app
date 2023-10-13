import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  socialConnect: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 38,
    gap: 16,
  },
  titleSocialConnect: {
    marginBottom: 4,
    color: colors.blackCoffee,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  itemSocialConnect: {
    minWidth: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelSocialConnect: {
    color: colors.blackCoffee,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
  },
  colorWhite: {
    color: colors.white,
  },
});
