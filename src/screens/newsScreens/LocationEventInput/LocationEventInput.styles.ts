import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  scrollView: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingBottom: 8,
    shadowColor: colors.blackCoffee,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    zIndex: 9,
  },
  wrapper: {
    marginTop: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackRich,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
