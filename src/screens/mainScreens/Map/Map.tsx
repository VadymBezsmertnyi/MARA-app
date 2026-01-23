import React, { FunctionComponent, useEffect, useMemo, useRef } from "react";
import { Platform, View } from "react-native";
import MapViewCluster from "react-native-map-clustering";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import dayjs from "dayjs";

// types
import { RootMainTabsParamList } from "../../../navigators/Navigators.types";
import { mapMarker } from "./Map.types";

// redux
import { useUserSelector } from "../../../storeRedux/apis/user/slice";

// providers
import { useWorkshopsProvider } from "../../../providers/WorkshopsProvider/WorkshopsProvider";
import { useThemeProvider } from "../../../providers/ThemeProvider/ThemeProvider";
import { useMapProvider } from "../../../providers/MapProvider/MapProvider";
import { useEventsProvider } from "../../../providers/EventsProvider/EventsProvider";
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import { EventMarker } from "./components/EventMarker/EventMarker";
import { MeMarker } from "./components/MeMarker/MeMarker";
import { UpContainer } from "./components/UpContainer/UpContainer";
import { EventContainer } from "./components/EventContainer/EventContainer";
import { WorkshopMarker } from "./components/WorkshopMarker/WorkshopMarker";

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

export const Map: FunctionComponent<MapProps> = () => {
  const { language } = useLocalesProvider();
  const { userData } = useUserSelector();
  const { workshops } = useWorkshopsProvider();
  const { location } = useMapProvider();
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
      </MapViewCluster>
      <UpContainer />
      <EventContainer firstEvent={firstEvent} showFirstEvent={showFirstEvent} />
    </View>
  );
};
