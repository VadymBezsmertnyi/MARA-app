import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  imageWrapper: { marginBottom: 10 },
  image: { width: '100%', height: 185, borderRadius: 3, overflow: 'hidden' },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.blackCoffee,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blackCoffee,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.blackCoffee,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.blackCoffee,
    marginTop: 12,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateOfEvent: {
    marginTop: 20,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.lightOrange,
    shadowColor: colors.grayShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 9,
    shadowOpacity: 0.8,
  },
  description: { marginTop: 10 },
  fullTextTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.blueTufts,
  },
  fullText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
  },
  mapWrapper: { height: 185, marginTop: 20 },
});
