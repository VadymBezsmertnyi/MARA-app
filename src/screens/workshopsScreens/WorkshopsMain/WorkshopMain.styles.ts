import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../styles/hooks';
import colors from '../../../../styles/colors';

const PADDING_HORIZONTAL = 16;
const GAP_MAIN = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    gap: verticalScale(GAP_MAIN),
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingBottom: verticalScale(PADDING_HORIZONTAL),
  },
  search: {
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingBottom: verticalScale(GAP_MAIN),
  },
});
