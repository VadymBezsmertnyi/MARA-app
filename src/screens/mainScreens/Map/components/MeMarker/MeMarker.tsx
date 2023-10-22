import React, { FunctionComponent, useContext, useMemo } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

// providers
import { mapContext } from '../../../../../providers/map/map.provider';

// styles
import { styles } from './MeMarker.styles';

type MeMarkerProps = {};

export const MeMarker: FunctionComponent<MeMarkerProps> = () => {
  const { location } = useContext(mapContext);
  const coordinateMarker = useMemo(
    () =>
      location?.longitude && location?.latitude
        ? {
            longitude: location.longitude,
            latitude: location.latitude,
          }
        : null,
    [location],
  );

  if (!coordinateMarker) return null;

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
