import { CSSProperties } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  containerButtonBack: { flexDirection: 'row', alignItems: 'center' },
  iconButtonBack: {
    stroke: colors.black,
    strokeWidth: 2,
  } as CSSProperties & ViewStyle,
  iconButtonBackWhite: {
    stroke: colors.white,
  } as CSSProperties & ViewStyle,
  titleButtonBack: { fontSize: 17 },
});
