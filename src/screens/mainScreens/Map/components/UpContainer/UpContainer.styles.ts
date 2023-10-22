import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../../../styles/hooks';
import colors from '../../../../../../styles/colors';

const MIN_HEIGHT = 44;

const SOS_PADDING_HORIZONTAL = 16;
const SOS_PADDING_VERTICAL = 3;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: verticalScale(MIN_HEIGHT),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(12),
    gap: 13,
  },
  blurViewContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sosContainer: {
    backgroundColor: colors.sosRed,
    paddingHorizontal: horizontalScale(SOS_PADDING_HORIZONTAL),
    paddingVertical: verticalScale(SOS_PADDING_VERTICAL),
  },
  buttonSos: { height: '100%', justifyContent: 'center' },
  titleButtonSos: {
    color: colors.white,
    fontWeight: '700',
  },
});
