import { Platform, StyleSheet } from 'react-native';
import { PADDING_ANDROID, PADDING_IOS } from '../../../../styles/constants';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  containerBody: { alignItems: 'center', gap: 44 },
  title: { color: colors.blackCoffee, fontWeight: '600', fontSize: 16 },
  containerButtons: {
    paddingBottom: Platform.OS === 'android' ? PADDING_ANDROID : PADDING_IOS,
  },
  colorWhite: { color: colors.white },
});
