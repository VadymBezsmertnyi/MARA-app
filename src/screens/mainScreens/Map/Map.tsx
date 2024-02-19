import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform, Text, View, ViewStyle } from "react-native";
import MapViewCluster from "react-native-map-clustering";
import { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainTabsParamList } from "../../../navigators/Navigators.types";
import { mapMarker } from "./Map.types";

// providers
import { workshopsContext } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { webSocketContext } from "../../../providers/WebSocketProvider/WebSocketProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";
import { userContext } from "../../../providers/UserProvider/UserProvider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";

// components
import { EventMarker } from "./components/EventMarker/EventMarker";
import { MeMarker } from "./components/MeMarker/MeMarker";
import { UpContainer } from "./components/UpContainer/UpContainer";
import { EventContainer } from "./components/EventContainer/EventContainer";
import { ButtonSearch } from "./components/ButtonSearch/ButtonSearch";
import { WorkshopMarker } from "./components/WorkshopMarker/WorkshopMarker";

// icons
import { IconLocationMarker } from "../../../icons/components";

// styles
import { styles } from "./Map.styles";

type MapProps = {
  navigation: NativeStackNavigationProp<RootMainTabsParamList>;
};

const DEFAULT_LOCATION: mapMarker = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent<MapProps> = ({ navigation }) => {
  const { userData } = useContext(userContext);
  const { workshops } = useContext(workshopsContext);
  const { stateSocket } = useContext(webSocketContext);
  const { location } = useContext(mapContext);
  const { theme, heightStatusBar } = useContext(themeContext);
  const { eventsList } = useContext(eventsContext);
  const [region, setRegion] = useState<mapMarker>(DEFAULT_LOCATION);
  const firstEvent = useMemo(
    () => (eventsList.length ? eventsList[0] : null),
    [eventsList]
  );
  const listUsers = useMemo(
    () =>
      stateSocket.geolocationUsers
        ? Object.keys(stateSocket.geolocationUsers).filter(
            (userId) => Number(userId) !== userData?.id
          )
        : [],
    [stateSocket.geolocationUsers, userData?.id]
  );
  const usersGeolocation = useMemo(
    () => (stateSocket.geolocationUsers ? stateSocket.geolocationUsers : null),
    [stateSocket.geolocationUsers]
  );
  const containerStyles: ViewStyle = useMemo(
    () => [styles.container, { marginTop: heightStatusBar }] as ViewStyle,
    [heightStatusBar]
  );

  const showFirstEvent = (location: mapMarker) => {
    setRegion(location);
  };

  useEffect(() => {
    if (location)
      setRegion((state) => ({
        ...state,
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }));
  }, []);

  return (
    <View style={containerStyles}>
      <MapViewCluster
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "ios" ? "terrain" : "standard"}
        initialRegion={DEFAULT_LOCATION}
        region={region}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        <MeMarker />
        {eventsList.map((eventItem) =>
          eventItem.place?.coordinates ? (
            <EventMarker
              key={`marker-event-${eventItem.id}`}
              longitude={eventItem.place?.coordinates.longitude}
              latitude={eventItem.place?.coordinates.latitude}
              event={eventItem}
            />
          ) : null
        )}
        {workshops.map((workshop) => (
          <WorkshopMarker
            key={`marker-workshop-${workshop.id}`}
            workshop={workshop}
            location={location}
          />
        ))}
        {listUsers.map((userId) => {
          const userLocation = usersGeolocation?.[userId]
            ? usersGeolocation[userId]
            : null;

          if (userLocation === null) return null;
          return (
            <Marker
              key={`user-marker-${userId}`}
              coordinate={userLocation.geoLocation}
            >
              <IconLocationMarker width={32} height={32} fill={"green"} />
              <Callout>
                <View style={{ width: 200 }}>
                  <Text>{`User ${userLocation.userId}`}:</Text>
                  <Text>longitude: {userLocation.geoLocation.longitude}</Text>
                  <Text>latitude: {userLocation.geoLocation.latitude}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapViewCluster>
      <UpContainer />
      <EventContainer firstEvent={firstEvent} showFirstEvent={showFirstEvent} />
      <ButtonSearch navigation={navigation} />
    </View>
  );
};
