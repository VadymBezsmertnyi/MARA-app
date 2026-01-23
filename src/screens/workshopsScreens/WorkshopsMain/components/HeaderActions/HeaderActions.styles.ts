import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  sortButtonContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortIndicator: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blazeOrange,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
