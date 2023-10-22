import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';

// components
import { SosMarker } from './components/SosMarker/SosMarker';
import { EventMarker } from './components/EventMarker/EventMarker';
import { MeMarker } from './components/MeMarker/MeMarker';

// styles
import { styles } from './Map.styles';
import { UpContainer } from './components/UpContainer/UpContainer';

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent = () => {
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
        <MeMarker />
        <SosMarker longitude={31.758758202195168} latitude={49.56848145137262} />
        <EventMarker longitude={31.95705860853195} latitude={49.493768216622755} />
      </MapView>
      <UpContainer />
    </View>
  );
};
