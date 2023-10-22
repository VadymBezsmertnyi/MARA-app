import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  menu: {
    backgroundColor: colors.white,
    width: 38,
    height: 38,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  line: { backgroundColor: colors.blackCoffee, width: 16, height: 2 },
});
