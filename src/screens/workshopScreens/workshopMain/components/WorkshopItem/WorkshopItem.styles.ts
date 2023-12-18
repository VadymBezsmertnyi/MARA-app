import { StyleSheet } from 'react-native';
import colors from '../../../../../../styles/colors';
import { horizontalScale, scaleFont, verticalScale } from '../../../../../../styles/hooks';

const PADDING_HORIZONTAL = 16;
const PADDING_TOP = 8;
const PADDING_BOTTOM = 36;
const GAP_MAIN = 28;
const FONT_SIZE_TITLE = 16;
const FONT_SIZE_DESCRIPTION = 12;
const PADDING_VERTICAL = 8;
const GAP_MORE = 8;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingTop: verticalScale(PADDING_TOP),
    paddingBottom: verticalScale(PADDING_BOTTOM),
    gap: verticalScale(GAP_MAIN),
  },
  title: {
    fontSize: scaleFont(FONT_SIZE_TITLE),
    fontWeight: '600',
    color: colors.blackCoffee,
  },
  description: {
    fontSize: scaleFont(FONT_SIZE_DESCRIPTION),
    color: colors.blackCoffee,
  },
  buttonMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(PADDING_VERTICAL),
    gap: horizontalScale(GAP_MORE),
  },
  titleButtonMore: {
    color: colors.blueTufts,
    fontSize: scaleFont(FONT_SIZE_DESCRIPTION),
    fontWeight: '600',
  },
});
