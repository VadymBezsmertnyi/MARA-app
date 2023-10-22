import React, { FunctionComponent, useMemo } from 'react';
import { Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

// icons
import { IconLocationMarker } from '../../../../../icons/components';

// styles
import colors from '../../../../../../styles/colors';
import { styles } from './OtherMarker.styles';

type OtherMarkerProps = {
  longitude: number;
  latitude: number;
};

export const OtherMarker: FunctionComponent<OtherMarkerProps> = ({ longitude, latitude }) => {
  const coordinateMarker = useMemo(
    () => ({
      longitude,
      latitude,
    }),
    [longitude, latitude],
  );

  return (
    <Marker coordinate={coordinateMarker}>
      <IconLocationMarker width={32} height={32} fill={colors.blueTufts} />
      <Callout style={styles.container}>
        <Text>TEST:</Text>
        <Text>longitude: {longitude}</Text>
        <Text>latitude: {latitude}</Text>
      </Callout>
    </Marker>
  );
};
