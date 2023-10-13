import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  logo: {
    flex: 0.85,
    justifyContent: 'center',
  },
  logoText: {
    backgroundColor: colors.white,
    padding: 20,
    fontSize: 26,
  },
  titles: {
    alignItems: 'center',
  },
  titlesDark: {
    color: colors.white,
  },
  titleMain: {
    color: colors.blackCoffee,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 32,
  },
  titleSub: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: colors.grayFuscous,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonLogin: {
    marginBottom: 24,
  },
  buttonRegistration: {},
});
