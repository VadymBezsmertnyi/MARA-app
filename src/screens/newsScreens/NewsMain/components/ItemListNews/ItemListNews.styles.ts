import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 16,
    paddingRight: 25,
    backgroundColor: '#FFEDDD',
    borderRadius: 4,
    shadowColor: Platform.OS === 'android' ? 'rgba(82, 77, 34, 0.10)' : 'rgba(82, 77, 34, 0.10)',
    elevation: 20,
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  containerTitles: {
    gap: 10,
  },
});
