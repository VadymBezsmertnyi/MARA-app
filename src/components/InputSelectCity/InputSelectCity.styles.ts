import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: colors.grayCloudy,
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 16,
    paddingLeft: 12,
  },
  titleInput: {
    color: colors.blackCoffee,
  },
  defaultTitleInput: {
    color: colors.grayCloudy,
  },
  input: { flex: 1, padding: 8, paddingLeft: 0 },
  arrowToUp: { transform: [{ rotate: '180deg' }] },
  containerList: { paddingVertical: 8 },
  city: { paddingHorizontal: 12, paddingVertical: 8 },
});
