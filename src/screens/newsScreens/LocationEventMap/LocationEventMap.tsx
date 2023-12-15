import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// components
import { Map } from '../../../components/Map/Map';
import { IconLocationMarker } from '../../../icons/components';
import { Header } from '../../../components/Header/Header';

// providers
import { mapContext } from '../../../providers/MapProvider/MapProvider';
import { localesContext } from '../../../../localization/localization.provider';

// types
import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';
import { PATHS_NEWS_SCREENS } from '../../../navigators/useNavigator.constants';

// styles
import { styles } from './LocationEventMap.styles';
import colors from '../../../../styles/colors';

type LocationEventMapProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

type MarkerProps = {
  latitude: number;
  longitude: number;
};

export const LocationEventMap: FunctionComponent<LocationEventMapProps> = ({ navigation }) => {
  const { location } = useContext(mapContext);
  const { i18n } = useContext(localesContext);

  const checkUserLocation = location?.latitude ? location : { latitude: 0, longitude: 0 };

  const [eventLocation, setEventLocation] = useState<MarkerProps>(checkUserLocation);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [eventLocation]);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._('The place of the event')}
        rightElement={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(PATHS_NEWS_SCREENS.addEvent);
            }}
          >
            <Text style={styles.headerButton}>OK</Text>
          </TouchableOpacity>
        }
      />
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
        <View style={styles.modal}>
          <Text style={styles.address}>вул. Якова Бєліка, 23</Text>
          {/* TODO need to implement geocoder */}
          <Text style={styles.city}>Рухайте і змінюйте розташування</Text>
          <View style={styles.modalInner}>
            <IconLocationMarker width={23} height={23} fill={colors.californiaOrange} />
            <Text style={styles.address}>200 km</Text>
          </View>
        </View>
      )}
    </View>
  );
};
