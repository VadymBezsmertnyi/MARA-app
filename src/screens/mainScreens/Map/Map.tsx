import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import MapView, { Details, Marker, Region } from 'react-native-maps';

// styles
import { styles } from './Map.styles';

export const Map: FunctionComponent = () => {
  const [state, setState] = useState({
    region: {
      latitude: 49.48373460830264,
      latitudeDelta: 20.088534144105573,
      longitude: 30.942929293960333,
      longitudeDelta: 20.875417850911617,
    },
  });

  const onRegionChange = (region: Region, _details: Details) => {
    setState({ region });
  };

  return (
    <View style={styles.container}>
      <MapView
        // TODO
        //provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={state.region}
        onRegionChange={onRegionChange}
      >
        <Marker
          coordinate={{
            latitude: 49.44058429021713,
            longitude: 32.06505976617336,
          }}
        >
          <View style={{ backgroundColor: 'red', width: 20, height: 20, borderRadius: 20 }} />
        </Marker>
      </MapView>
    </View>
  );
};
