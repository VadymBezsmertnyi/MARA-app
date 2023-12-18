import { Platform, StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  menu: {
    backgroundColor: colors.white,
    width: 38,
    height: 38,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    shadowColor: Platform.OS === 'android' ? colors.black : colors.black35,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 20,
    shadowRadius: 10,
    shadowOpacity: 0.4,
  },
  line: { backgroundColor: colors.blackCoffee, width: 16, height: 2 },
});
