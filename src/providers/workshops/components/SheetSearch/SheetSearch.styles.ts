import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../../styles/hooks';
import colors from '../../../../../styles/colors';

const PADDING_HORIZONTAL = 16;

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    paddingHorizontal: horizontalScale(PADDING_HORIZONTAL),
    paddingVertical: verticalScale(24),
    gap: 20,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.platinumGray,
    borderRadius: 8,
    gap: 8,
  },
  scrollViewContainer: { gap: 12 },
});
