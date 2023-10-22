import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: { height: 74 },
  absoluteContainer: { position: 'absolute', bottom: 0, width: '100%' },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    paddingHorizontal: 27,
    paddingVertical: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    padding: 2,
  },
});
