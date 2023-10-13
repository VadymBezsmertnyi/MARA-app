import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  blurStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.8,
  },
  blurStyleWeb: {
    backgroundColor: colors.philippineSilver06,
    backdropFilter: 'blur(5.5px)',
  },
  blurStyleApp: {
    backgroundColor: colors.philippineSilver06,
  },
  fullOpacity: {
    opacity: 1,
  },
});

export default styles;
