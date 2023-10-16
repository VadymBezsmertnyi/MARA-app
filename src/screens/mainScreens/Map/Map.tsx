import React, { FunctionComponent, useContext, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Details, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

// styles
import { styles } from './Map.styles';
import { mapContext } from '../../../providers/map/map.provider';

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent = () => {
  const { location } = useContext(mapContext);
  const [state, setState] = useState({
    region: DEFAULT_LOCATION,
  });

  const onRegionChange = (region: Region, _details: Details) => {
    setState({ region });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={state.region}
        onRegionChange={onRegionChange}
        zoomControlEnabled
      >
        <Marker
          coordinate={{
            longitude: location?.longitude || 0,
            latitude: location?.latitude || 0,
          }}
        >
          <View
            style={{
              backgroundColor: 'green',
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
            }}
          >
            <Text>YOUR</Text>
          </View>
        </Marker>
        <Marker
          coordinate={{
            longitude: 31.758758202195168,
            latitude: 49.56848145137262,
          }}
        >
          <View
            style={{
              backgroundColor: 'red',
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: 'center',
            }}
          >
            <Text>SOS</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
};
