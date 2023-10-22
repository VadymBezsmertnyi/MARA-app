import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';

// components
import { SosMarker } from './components/SosMarker/SosMarker';
import { EventMarker } from './components/EventMarker/EventMarker';
import { MeMarker } from './components/MeMarker/MeMarker';
import { UpContainer } from './components/UpContainer/UpContainer';
import { EventContainer } from './components/EventContainer/EventContainer';

// styles
import { styles } from './Map.styles';
import { OtherMarker } from './components/OtherMarker/OtherMarker';

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

const DEFAULT_LOCATIONS = [
  {
    longitude: 32.04073045402765,
    latitude: 49.435687070760046,
  },
  {
    longitude: 32.10822053253651,
    latitude: 49.40207074110663,
  },
];

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
        mapType={'terrain'}
        initialRegion={state.region}
        onRegionChange={onRegionChange}
        zoomControlEnabled
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        <MeMarker />
        <SosMarker longitude={31.758758202195168} latitude={49.56848145137262} />
        <EventMarker longitude={31.95705860853195} latitude={49.493768216622755} />
        {DEFAULT_LOCATIONS.map(({ longitude, latitude }, index) => (
          <OtherMarker
            key={`other-marker-${index + 1}`}
            longitude={longitude}
            latitude={latitude}
          />
        ))}
      </MapView>
      <UpContainer />
      <EventContainer />
    </View>
  );
};
