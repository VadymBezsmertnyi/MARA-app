import React, { FunctionComponent, useMemo } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

// styles
import { styles } from './SosMarker.styles';

type SosMarkerProps = {
  longitude: number;
  latitude: number;
};

export const SosMarker: FunctionComponent<SosMarkerProps> = ({ longitude, latitude }) => {
  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude],
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <View style={styles.container}>
        <View style={styles.firstCircle} />
        <View style={styles.secondCircle} />
        <View style={styles.thirdCircle} />
      </View>
    </Marker>
  );
};
