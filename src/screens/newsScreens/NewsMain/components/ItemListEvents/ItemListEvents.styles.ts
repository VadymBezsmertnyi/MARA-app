import { Platform, StyleSheet } from 'react-native';
import { horizontalScale, verticalScale } from '../../../../../../styles/hooks';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(8),
    backgroundColor: '#FFEDDD',
    borderRadius: 4,
    shadowColor: Platform.OS === 'android' ? 'rgba(82, 77, 34, 0.10)' : 'rgba(82, 77, 34, 0.10)',
    elevation: 20,
    shadowRadius: 20,
    shadowOpacity: 1,
    gap: 8,
  },
  containerImage: { flex: 1, width: 60 },
  image: { width: '100%', height: 52 },
  part: { gap: 10 },
  containerLocation: { flexDirection: 'row' },
});
