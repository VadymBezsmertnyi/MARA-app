import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../../../styles/hooks';
import colors from '../../../../../../styles/colors';

const MIN_HEIGHT = 44;

const MIN_WIDTH_CONTAINER = 222;
const TOP_CONTAINER = 110;

export const styles = StyleSheet.create({
  linearGradientContainer: {
    position: 'absolute',
    top: verticalScale(TOP_CONTAINER),
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    minWidth: horizontalScale(MIN_WIDTH_CONTAINER),
    minHeight: verticalScale(MIN_HEIGHT),
    overflow: 'hidden',
  },
  container: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
  },
  blurViewContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: { color: colors.white, fontSize: 16, fontWeight: '600' },
  subTitle: { color: colors.white, fontSize: 12, fontWeight: '600' },
});
