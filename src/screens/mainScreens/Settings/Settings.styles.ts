import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },
  containerAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  containerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  buttonAddPhoto: {
    borderRadius: 8,
    backgroundColor: colors.DavysGray,
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleButtonAddPhoto: {
    color: colors.white,
  },
  option: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
