import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// styles
import { styles } from './Map.styles';

export const Map: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} />
    </View>
  );
};
