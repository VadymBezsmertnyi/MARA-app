import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform, View, ViewStyle } from "react-native";
import MapViewCluster from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// types
import { RootMainTabsParamList } from "../../../navigators/Navigators.types";
import { mapMarker } from "./Map.types";

// providers
import { workshopsContext } from "../../../providers/workshops/workshops.provider";
import { themeContext } from "../../../providers/ThemeProvider/ThemeProvider";
import { webSocketContext } from "../../../providers/WebSocketProvider/WebSocketProvider";
import { mapContext } from "../../../providers/MapProvider/MapProvider";
import { userContext } from "../../../providers/user/user.provider";
import { eventsContext } from "../../../providers/EventsProvider/EventsProvider";

// components
import { SosMarker } from "./components/SosMarker/SosMarker";
import { EventMarker } from "./components/EventMarker/EventMarker";
import { MeMarker } from "./components/MeMarker/MeMarker";
import { UpContainer } from "./components/UpContainer/UpContainer";
import { EventContainer } from "./components/EventContainer/EventContainer";
import { OtherMarker } from "./components/OtherMarker/OtherMarker";
import { ButtonSearch } from "./components/ButtonSearch/ButtonSearch";
import { UserMarker } from "./components/UserMarker/UserMarker";

// styles
import { styles } from "./Map.styles";
import colors from "../../../../styles/colors";

type MapProps = {
  navigation: NativeStackNavigationProp<RootMainTabsParamList>;
};

const DEFAULT_LOCATION: mapMarker = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const Map: FunctionComponent<MapProps> = () => {
  const { userData } = useContext(userContext);
  const { workshops } = useContext(workshopsContext);
  const { stateSocket } = useContext(webSocketContext);
  const { location } = useContext(mapContext);
  const { theme, heightStatusBar } = useContext(themeContext);
  const { eventsList } = useContext(eventsContext);
  const firstEvent = useMemo(
    () => (eventsList.length ? eventsList[0] : null),
    [eventsList]
  );
  const [region, setRegion] = useState<mapMarker>(DEFAULT_LOCATION);
  const [firstEventLocation, setFirstEventLocation] =
    useState<mapMarker | null>(null);
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
    setFirstEventLocation(location);
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
        onRegionChange={() => {}}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4346, longitude: 32.0621 }} />
        <Marker coordinate={{ latitude: 49.4285, longitude: 32.0626 }} />
        <Marker coordinate={{ latitude: 49.4467, longitude: 32.0616 }} />
        <Marker coordinate={{ latitude: 49.4011, longitude: 32.0698 }} />
        <Marker coordinate={{ latitude: 49.5414, longitude: 32.0512 }} />
        <Marker coordinate={{ latitude: 49.4435, longitude: 31.0169 }} />
        <Marker coordinate={{ latitude: 49.4389, longitude: 29.9874 }} />
        <Marker coordinate={{ latitude: 49.4385, longitude: 29.9885 }} />
        <Marker coordinate={{ latitude: 49.4319, longitude: 29.9794 }} />
        <MeMarker />
        <SosMarker
          longitude={31.758758202195168}
          latitude={49.56848145137262}
        />
        {firstEventLocation && firstEvent ? (
          <EventMarker
            longitude={firstEventLocation.longitude}
            latitude={firstEventLocation.latitude}
            event={firstEvent}
          />
        ) : null}
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
        {listUsers.map((userId) => {
          const userLocation = usersGeolocation?.[userId]
            ? usersGeolocation[userId]
            : null;

          if (userLocation === null) return null;
          return (
            <UserMarker
              key={`user-marker-${userId}`}
              longitude={userLocation.geoLocation.longitude}
              latitude={userLocation.geoLocation.latitude}
              markerSize={32}
              markerColor={"green"}
              title={`User ${userLocation.userId}`}
            />
          );
        })}
      </MapViewCluster>
      <UpContainer />
      <EventContainer firstEvent={firstEvent} showFirstEvent={showFirstEvent} />
      <ButtonSearch />
    </View>
  );
};
