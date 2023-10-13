import { Platform, StyleSheet } from 'react-native';
import { PADDING_ANDROID, PADDING_IOS } from '../../../styles/constants';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    marginBottom: 16,
    color: colors.blackCoffee,
    fontSize: 16,
    fontWeight: '600',
  },
  inputsOther: {},
  containerForgetPassword: {
    alignItems: 'flex-end',
  },
  linkForgetPassword: {
    color: colors.blueTest,
    fontSize: 12,
    fontWeight: '600',
  },
  containerLinkForgetPassword: {
    borderBottomColor: colors.blueTest,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  titleForgetPassword: { color: colors.blueTest, fontSize: 12, fontWeight: '600' },
  containerButtons: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? PADDING_ANDROID : PADDING_IOS,
  },
  colorWhite: { color: colors.white },
});
