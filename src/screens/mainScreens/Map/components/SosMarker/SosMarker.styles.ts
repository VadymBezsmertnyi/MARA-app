import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    opacity: 1,
    borderRadius: 40,
    width: 42,
    height: 42,
  },
  firstCircle: {
    width: 42,
    height: 42,
    backgroundColor: colors.electricRed,
    opacity: 0.2,
    borderRadius: 40,
  },
  secondCircle: {
    position: 'absolute',
    top: 7,
    left: 7,
    backgroundColor: colors.electricRed,
    opacity: 0.4,
    borderRadius: 40,
    width: 28,
    height: 28,
  },
  thirdCircle: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: colors.electricRed,
    opacity: 1,
    borderRadius: 40,
    width: 14,
    height: 14,
  },
});
