import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 20,
  },
  label: { fontSize: 16, fontWeight: '600', color: colors.blackCoffee },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 4,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  input: {
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.blackCoffee,
  },
});
