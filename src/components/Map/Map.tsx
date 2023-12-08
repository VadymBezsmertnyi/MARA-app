import React, { FunctionComponent, useContext, useMemo } from 'react';
import { Platform, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// providers
import { themeContext } from '../../providers/theme/theme.provider';

// components
import { OtherMarker } from '../../screens/mainScreens/Map/components/OtherMarker/OtherMarker';

// styles
import { styles } from './Map.styles';
import colors from '../../../styles/colors';

const mapType = Platform.OS === 'ios' ? 'terrain' : 'standard';

type MapProps = {
  longitude: number;
  latitude: number;
  onRegionChange?: () => void;
};

const DEFAULT_LOCATION = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const Map: FunctionComponent<MapProps> = ({ longitude, latitude, onRegionChange }) => {
  const { theme } = useContext(themeContext);

  const initialRegion = useMemo(
    () => ({ ...DEFAULT_LOCATION, longitude, latitude }),
    [longitude, latitude],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={mapType}
        initialRegion={initialRegion}
        onRegionChange={onRegionChange}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        <OtherMarker
          longitude={longitude}
          latitude={latitude}
          markerColor={colors.electricRed}
          markerSize={45}
        />
      </MapView>
    </View>
  );
};
