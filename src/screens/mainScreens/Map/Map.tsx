import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { Platform, Text, View } from "react-native";
import MapViewCluster from "react-native-map-clustering";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";

// types
import { RootMainTabsParamList } from "../../../navigators/Navigators.types";
import { mapMarker } from "./Map.types";

// providers
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { useUserProvider } from "../../../providers/UserProvider/UserProvider";
import { useEventsProvider } from "../../../providers/EventsProvider/EventsProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import { EventMarker } from "./components/EventMarker/EventMarker";
import { MeMarker } from "./components/MeMarker/MeMarker";
import { UpContainer } from "./components/UpContainer/UpContainer";
import { EventContainer } from "./components/EventContainer/EventContainer";
import { WorkshopMarker } from "./components/WorkshopMarker/WorkshopMarker";
import { SosMarker } from "./components/SosMarker/SosMarker";

// icons
import { IconAutoMap } from "../../../icons/components";

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
  const { i18n, language } = useLocalesProvider();
  const { userData } = useUserProvider();
  const { workshops } = useWorkshopsProvider();
  const { location, usersMaps, usersSos } = useMapProvider();
  const { theme } = useThemeProvider();
  const { eventsList } = useEventsProvider();
  const refMap = useRef<MapView>(null);

  const showEventList = useMemo(
    () =>
      eventsList.filter(
        (eventItem) => eventItem.date.finish > dayjs().valueOf()
      ),
    [eventsList]
  );
  const firstEvent = useMemo(
    () => (eventsList.length ? eventsList[0] : null),
    [eventsList]
  );
  const listUsers = useMemo(
    () =>
      usersMaps
        ? usersMaps.filter(({ userId }) => userId !== userData?._id)
        : [],
    [usersMaps, userData?._id, location]
  );
  const listUsersSos = useMemo(
    () =>
      usersSos ? usersSos.filter(({ userId }) => userId !== userData?._id) : [],
    [usersSos, userData?._id, location]
  );

  const showFirstEvent = (location: mapMarker) => {
    if (refMap.current)
      refMap.current.animateToRegion({
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
  };

  const getToUser = () => {
    if (location && refMap.current)
      refMap.current.animateToRegion({
        ...location,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
  };

  const getToCity = () => {
    const cityCoordinates =
      userData?.place_id?.[language].geometry.location || null;
    if (cityCoordinates && refMap.current)
      refMap.current.animateToRegion({
        longitude: cityCoordinates.lng,
        latitude: cityCoordinates.lat,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
  };

  useEffect(() => {
    if (location) getToUser();
    else getToCity();
  }, [!location, userData?._id]);

  return (
    <View style={styles.container}>
      <MapViewCluster
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "ios" ? "terrain" : "standard"}
        initialRegion={DEFAULT_LOCATION}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsIndoorLevelPicker={false}
        onLayout={() => {
          getToUser();
        }}
      >
        <MeMarker />
        {showEventList.map((eventItem) =>
          eventItem?.coordinates ? (
            <EventMarker
              key={`marker-event-${eventItem._id}`}
              location={location}
              event={eventItem}
            />
          ) : null
        )}
        {workshops.map((workshop) => (
          <WorkshopMarker
            key={`marker-workshop-${workshop._id}`}
            workshop={workshop}
            location={location}
          />
        ))}
        {listUsers.map((userLocation) => {
          const dateNow = dayjs().valueOf();
          const isUserSos =
            listUsersSos.filter(
              (userSos) => userSos.userId === userLocation.userId
            ).length > 0;
          if (userLocation === null || isUserSos) return null;
          const timeUpdate =
            dateNow > userLocation.date ? dateNow - userLocation.date : null;
          return (
            <Marker
              key={`user-marker-${userLocation.userId}`}
              coordinate={userLocation.location}
            >
              <IconAutoMap width={24} height={24} fill={colors.pinkNight} />
              <Callout>
                <View style={styles.containerClusterUser}>
                  <Text>{`User #${userLocation.userId}`}</Text>
                  {timeUpdate ? (
                    <Text>
                      {i18n._("Last update")}:{" "}
                      {dayjs(timeUpdate).format("mm:ss")}
                    </Text>
                  ) : null}
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
            phoneNumber={userLocationSos.phoneNumber}
            telegram={userLocationSos.telegram}
            description={userLocationSos.description}
            date={userLocationSos.date}
          />
        ))}
      </MapViewCluster>
      <UpContainer />
      <EventContainer firstEvent={firstEvent} showFirstEvent={showFirstEvent} />
      {/* <ButtonSearch navigation={navigation} /> */}
    </View>
  );
};
