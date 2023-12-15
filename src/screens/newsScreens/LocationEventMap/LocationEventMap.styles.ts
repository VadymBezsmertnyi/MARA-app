import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  wrapper: {
    paddingTop: 10,
    paddingBottom: 13,
    backgroundColor: colors.white,
    shadowColor: colors.blackCoffee,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    zIndex: 9,
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
  headerButton: {
    fontSize: 17,
    color: colors.blackCoffee,
    textTransform: 'uppercase',
  },
  modal: {
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    shadowColor: colors.blackCoffee,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
    zIndex: 9,
    borderRadius: 9,
  },
  address: {
    fontSize: 16,
    color: colors.blackCoffee,
    fontWeight: '600',
  },
  city: {
    fontSize: 16,
    color: colors.blackCoffee,
    marginTop: 12,
  },
  modalInner: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
