import { StyleSheet } from 'react-native';
import colors from '../../../../../styles/colors';

export const styles = StyleSheet.create({
  container: { gap: 12 },
  containerWorkshop: { flexDirection: 'row', justifyContent: 'space-between' },
  containerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  containerTitles: { gap: 8 },
  title: { color: colors.black, fontSize: 16, fontWeight: '600' },
  subTitle: { color: colors.black, fontSize: 12, fontWeight: '400' },
  containerRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  line: { width: '100%', height: 1, backgroundColor: colors.gray },
});
