import { Platform, StyleSheet } from 'react-native';

const MARGIN_BOTTOM_IOS = 4;

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 24 },
  buttonSubmit: {
    marginBottom: Platform.OS === 'ios' ? MARGIN_BOTTOM_IOS : 12,
  },
});
