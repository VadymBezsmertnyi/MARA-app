import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { Platform, View } from 'react-native';
import MapView, { Details, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// types
import { RootMainTabsParamList } from '../../../navigators/Navigators.types';

// providers
import { workshopsContext } from '../../../providers/workshops/workshops.provider';
import { themeContext } from '../../../providers/theme/theme.provider';
import { webSocketContext } from '../../../providers/WebSocketProvider/WebSocketProvider';

// components
import { SosMarker } from './components/SosMarker/SosMarker';
import { EventMarker } from './components/EventMarker/EventMarker';
import { MeMarker } from './components/MeMarker/MeMarker';
import { UpContainer } from './components/UpContainer/UpContainer';
import { EventContainer } from './components/EventContainer/EventContainer';
import { OtherMarker } from './components/OtherMarker/OtherMarker';
import { ButtonSearch } from './components/ButtonSearch/ButtonSearch';

// styles
import { styles } from './Map.styles';
import colors from '../../../../styles/colors';
import { UserMarker } from './components/UserMarker/UserMarker';
import { userContext } from '../../../providers/user/user.provider';

type MapProps = {
  navigation: NativeStackNavigationProp<RootMainTabsParamList>;
};

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent<MapProps> = () => {
  const { userData } = useContext(userContext);
  const { workshops } = useContext(workshopsContext);
  const { stateSocket } = useContext(webSocketContext);
  const { theme } = useContext(themeContext);
  const [state, setState] = useState({
    region: DEFAULT_LOCATION,
  });
  const listUsers = useMemo(
    () =>
      stateSocket.geolocationUsers
        ? Object.keys(stateSocket.geolocationUsers).filter(
            userId => Number(userId) !== userData?.id,
          )
        : [],
    [stateSocket.geolocationUsers, userData?.id],
  );
  const usersGeolocation = useMemo(
    () => (stateSocket.geolocationUsers ? stateSocket.geolocationUsers : null),
    [stateSocket.geolocationUsers],
  );

  const onRegionChange = (region: Region, _details: Details) => {
    setState({ region });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === 'ios' ? 'terrain' : 'standard'}
        initialRegion={state.region}
        onRegionChange={onRegionChange}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        <MeMarker />
        <SosMarker longitude={31.758758202195168} latitude={49.56848145137262} />
        <EventMarker longitude={31.95705860853195} latitude={49.493768216622755} />
        {workshops.map(({ longitude, latitude, title }, index) => (
          <OtherMarker
            key={`other-marker-${index + 1}`}
            longitude={longitude}
            latitude={latitude}
            markerSize={32}
            markerColor={colors.blueTufts}
            title={title}
          />
        ))}
        {listUsers.map(userId => {
          const userLocation = usersGeolocation?.[userId] ? usersGeolocation[userId] : null;

          if (userLocation === null) return null;
          return (
            <UserMarker
              key={`user-marker-${userId}`}
              longitude={userLocation.geoLocation.longitude}
              latitude={userLocation.geoLocation.latitude}
              markerSize={32}
              markerColor={'green'}
              title={`User ${userLocation.userId}`}
            />
          );
        })}
      </MapView>
      <UpContainer />
      <EventContainer />
      <ButtonSearch />
    </View>
  );
};
