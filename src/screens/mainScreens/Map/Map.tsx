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
import { SosMarker } from "./components/SosMarker/SosMarker";

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
  const { location, usersMaps, usersSos } = useContext(mapContext);
  const { theme, heightStatusBar } = useContext(themeContext);
  const { eventsList } = useContext(eventsContext);
  const [region, setRegion] = useState<mapMarker>(DEFAULT_LOCATION);
  const firstEvent = useMemo(
    () => (eventsList.length ? eventsList[0] : null),
    [eventsList]
  );
  const listUsers = useMemo(
    () =>
      usersMaps
        ? usersMaps.filter(({ userId }) => Number(userId) !== userData?.id)
        : [],
    [usersMaps, userData?.id]
  );
  const listUsersSos = useMemo(
    () =>
      usersSos
        ? usersSos.filter(({ userId }) => Number(userId) !== userData?.id)
        : [],
    [usersSos, userData?.id]
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
        {listUsers.map((userLocation) => {
          if (userLocation === null) return null;
          return (
            <Marker
              key={`user-marker-${userLocation.userId}`}
              coordinate={userLocation.location}
            >
              <IconLocationMarker width={32} height={32} fill={"green"} />
              <Callout>
                <View style={styles.containerClusterUser}>
                  <Text>{`User ${userLocation.userId}`}:</Text>
                  <Text>longitude: {userLocation.location.longitude}</Text>
                  <Text>latitude: {userLocation.location.latitude}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
        {listUsersSos.map((userLocationSos) => (
          <SosMarker
            key={`user-sos-marker-${userLocationSos.userId}`}
            longitude={userLocationSos.location.longitude}
            latitude={userLocationSos.location.latitude}
          />
        ))}
      </MapViewCluster>
      <UpContainer />
      <EventContainer firstEvent={firstEvent} showFirstEvent={showFirstEvent} />
      <ButtonSearch navigation={navigation} />
    </View>
  );
};
