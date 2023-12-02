import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  socialConnect: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 38,
    gap: 20,
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
    flex: 1,
    padding: 6,
    paddingLeft: 52,
    paddingRight: 53,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  labelSocialConnect: {
    color: colors.californiaOrange,
    fontSize: 16,
    fontWeight: '600',
  },
  colorWhite: {
    color: colors.white,
  },
  containerButtons: {
    gap: 8,
  },
});
