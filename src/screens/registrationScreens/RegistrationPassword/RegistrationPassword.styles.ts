import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 24, justifyContent: 'space-between' },
  inputContainer: { flex: 1 },
  title: {
    marginVertical: 28,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  containerButton: { height: 110 },
  buttonSubmit: {
    marginVertical: 10,
  },
  colorWhite: {
    color: colors.white,
  },
});
