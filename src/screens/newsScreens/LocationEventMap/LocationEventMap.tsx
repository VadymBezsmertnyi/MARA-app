import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { Map } from '../../../components/Map/Map';
import { mapContext } from '../../../providers/map/map.provider';
import { styles } from './LocationEventMap.styles';

type MarkerProps = {
  latitude: number;
  longitude: number;
};

export const LocationEventMap: FunctionComponent = () => {
  const { location } = useContext(mapContext);

  const checkUserLocation = location?.latitude ? location : { latitude: 0, longitude: 0 };

  const [eventLocation, setEventLocation] = useState<MarkerProps>(checkUserLocation);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [eventLocation]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Виберіть місце на карті</Text>
        <Text style={styles.subtitle}>Рухайте і змінюйте розташування</Text>
      </View>
      <Map
        latitude={eventLocation?.latitude || 0}
        longitude={eventLocation?.longitude || 0}
        onPress={event => {
          setEventLocation(event.nativeEvent.coordinate);
        }}
      />
      {showModal && (
        <View style={{ height: 200 }}>
          <Text style={styles.title}>Виберіть місце на карті</Text>
          <Text style={styles.subtitle}>Рухайте і змінюйте розташування</Text>
        </View>
      )}
    </View>
  );
};
