import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    marginBottom: 6,
    textAlign: 'left',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 15,
    color: colors.grayFuscous,
  },
  inputContainer: {
    width: '100%',
    minHeight: 56,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayCloudy,
  },
  inputField: {
    minHeight: 56,
    padding: 14,
    width: '90%',
  },
  inputError: {
    borderColor: colors.errorRed,
  },
  errorMessage: {
    width: '100%',
    textAlign: 'left',
    color: colors.errorRed,
    paddingTop: 6,
    fontSize: 12,
    minHeight: 20,
  },
});

export { styles };
