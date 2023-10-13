import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 28,
  },
  containerMain: { flex: 1 },
  containerTitles: { gap: 16 },
  title: {
    fontWeight: '700',
    fontSize: 28,
    color: colors.blackCoffee,
    marginTop: 44,
    textAlign: 'center',
  },
  subTitle: { color: colors.blackCoffee, fontSize: 16, fontWeight: '600', textAlign: 'center' },
  containerCode: { marginTop: 44 },
  containerCodeInputs: { flexDirection: 'row', justifyContent: 'center' },
  input: {
    width: 44,
    height: 50,
    borderColor: colors.grayMercury,
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 8,
    fontSize: 22,
    textAlign: 'center',
    marginRight: 12,
  },
  codeFieldRoot: { width: '60%' },
  containerResend: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonResendCode: {
    alignItems: 'center',
  },
  containerResendCode: {
    marginTop: 24,
    borderBottomColor: colors.blueTest,
    borderBottomWidth: 1,
  },
  resendCode: {
    color: colors.blueTest,
  },
  focusCell: {
    borderColor: colors.grayCloudy,
  },
  colorWhite: { color: colors.white },
});
