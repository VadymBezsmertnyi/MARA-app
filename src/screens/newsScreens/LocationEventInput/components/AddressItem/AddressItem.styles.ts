import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 15,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayCloudy,
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  street: { fontSize: 16, fontWeight: '600', color: colors.blackCoffee },
  city: { fontSize: 12, color: colors.blackCoffee, marginTop: 5 },
  buttonTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.blueTufts,
    marginTop: 15,
    marginLeft: 15,
  },
});
