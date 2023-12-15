import React, { FunctionComponent, useMemo } from 'react';
import { Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

// icons
import { IconLocationMarker } from '../../../../../icons/components';

// styles
import { styles } from './OtherMarker.styles';

type OtherMarkerProps = {
  longitude: number;
  latitude: number;
  markerSize: number;
  markerColor: string;
  title: string;
};

export const OtherMarker: FunctionComponent<OtherMarkerProps> = ({
  longitude,
  latitude,
  markerSize,
  markerColor,
  title,
}) => {
  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude],
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <IconLocationMarker width={markerSize} height={markerSize} fill={markerColor} />
      <Callout style={styles.container}>
        <Text>{title}:</Text>
        <Text>longitude: {longitude}</Text>
        <Text>latitude: {latitude}</Text>
      </Callout>
    </Marker>
  );
};
