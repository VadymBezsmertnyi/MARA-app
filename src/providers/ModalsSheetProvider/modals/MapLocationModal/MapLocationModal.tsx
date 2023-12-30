import React, { FunctionComponent, useContext, useState } from "react";
import { Platform, Text, View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import axios from "axios";

// styles
import { styles } from "./MapLocationModal.styles";
import { themeContext } from "../../../theme/theme.provider";
import { Trans } from "@lingui/macro";
import { localesContext } from "../../../../../localization/localization.provider";
import qs from "qs";

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB as string;
const URL_GOOGLE_PLACE_API = "https://maps.googleapis.com/maps/api/place";

export const MapLocationModal: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { language } = useContext(localesContext);
  const [marker, setMarker] = useState<LatLng | null>(null);

  const getDetailPlace = async (place_id: string) => {
    const queryParams = qs.stringify({
      place_id,
      key: EXPO_PUBLIC_API_KEY_GOOGLE_WEB,
      language,
    });
    const apiUrlDetails = `${URL_GOOGLE_PLACE_API}/details/json?${queryParams}`;
    const result = await axios.get(apiUrlDetails);
  };

  const getPlaces = async (event: MapPressEvent) => {
    const {
      coordinate: { latitude, longitude },
    } = event.nativeEvent;
    const queryParams = qs.stringify({
      location: `${latitude},${longitude}`,
      radius: 100,
      key: EXPO_PUBLIC_API_KEY_GOOGLE_WEB,
      language,
    });

    const apiUrlPlaces = `${URL_GOOGLE_PLACE_API}/nearbysearch/json?${queryParams}`;
    const result = await axios.get(apiUrlPlaces);
    setMarker({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitles}>
        <Text style={styles.title}>
          <Trans>Select a location on the map</Trans>
        </Text>
        <Text style={styles.subTitle}>
          <Trans>Move and change location</Trans>
        </Text>
      </View>
      <MapView
        onPress={getPlaces}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "ios" ? "terrain" : "standard"}
        initialRegion={DEFAULT_LOCATION}
        region={DEFAULT_LOCATION}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        {marker ? <Marker coordinate={marker} /> : null}
      </MapView>
    </View>
  );
};
