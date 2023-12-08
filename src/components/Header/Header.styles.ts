import { CSSProperties } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 9,
    paddingBottom: 11,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: 50,
  },
  title: {
    color: colors.blackCoffee,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  containerButtonBack: { flexDirection: 'row', alignItems: 'center' },
  iconButtonBack: {
    stroke: colors.blackCoffee,
    strokeWidth: 2,
  } as CSSProperties & ViewStyle,
  iconButtonBackWhite: {
    stroke: colors.white,
  } as CSSProperties & ViewStyle,
  titleButtonBack: { fontSize: 17 },
});
