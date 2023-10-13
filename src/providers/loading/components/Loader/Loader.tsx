import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

// styles
import styles from './Loader.styles';

export const Loader: FunctionComponent = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);
