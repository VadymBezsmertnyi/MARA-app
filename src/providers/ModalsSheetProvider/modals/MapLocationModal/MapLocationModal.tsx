import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import axios from "axios";
import { Trans } from "@lingui/macro";
import qs from "qs";
import { convertDistance, getDistance } from "geolib";

// types
import { NearbySearchGoogleType } from "./MapLocationModal.types";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

// providers
import { themeContext } from "../../../theme/theme.provider";
import { localesContext } from "../../../../../localization/localization.provider";
import { mapContext } from "../../../MapProvider/MapProvider";

// components
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";

// icons
import { IconLocationMarkerGradient } from "../../../../icons/components";

// styles
import { styles } from "./MapLocationModal.styles";
import colors from "../../../../../styles/colors";

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

type MapLocationModalProps = {
  isOpenModal: boolean;
  setLocation: (location: GoogleLocationDetailResult) => void;
};

const EXPO_PUBLIC_API_KEY_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_API_KEY_GOOGLE_WEB as string;
const URL_GOOGLE_PLACE_API = "https://maps.googleapis.com/maps/api/place";

export const MapLocationModal: FunctionComponent<MapLocationModalProps> = ({
  isOpenModal,
  setLocation,
}) => {
  const { theme } = useContext(themeContext);
  const { language, i18n } = useContext(localesContext);
  const { location } = useContext(mapContext);
  const [marker, setMarker] = useState<LatLng | null>(null);
  const [region, setRegion] = useState(DEFAULT_LOCATION);
  const [listAddress, setListAddress] = useState<NearbySearchGoogleType[]>([]);
  const [selectAddress, setSelectAddress] =
    useState<GoogleLocationDetailResult | null>(null);

  const getDetailPlace = async (place_id: string) => {
    const queryParams = qs.stringify({
      place_id,
      key: EXPO_PUBLIC_API_KEY_GOOGLE_WEB,
      language,
    });
    const apiUrlDetails = `${URL_GOOGLE_PLACE_API}/details/json?${queryParams}`;
    const result = await axios.get<{
      result: GoogleLocationDetailResult;
      status: string;
    }>(apiUrlDetails);

    if (result.data.status === "OK") {
      setSelectAddress(result.data.result);
    }
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
    const result = await axios.get<{
      results: NearbySearchGoogleType[];
      status: string;
    }>(apiUrlPlaces);
    setSelectAddress(null);
    if (result.data.status === "OK") {
      setListAddress(result.data.results);
      setMarker({ latitude, longitude });
    }
  };

  const onPressSelect = () => {
    if (selectAddress) setLocation(selectAddress);
  };

  useEffect(() => {
    if (isOpenModal) setRegion(DEFAULT_LOCATION);
  }, [isOpenModal]);

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
        initialRegion={DEFAULT_LOCATION}
        region={region}
        onRegionChange={(event) => {
          if (!isOpenModal) setRegion(event);
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={Platform.OS === "ios" ? "terrain" : "standard"}
        zoomControlEnabled
        userInterfaceStyle={theme}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsIndoorLevelPicker={false}
      >
        {marker ? <Marker coordinate={marker} /> : null}
      </MapView>
      {listAddress.length ? (
        <View style={styles.containerFooter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
          >
            {listAddress.map((address) => {
              const distance = location
                ? getDistance(location, address.geometry.location)
                : null;
              const isSelect = address.place_id === selectAddress?.place_id;
              const getStyle = () => [
                styles.itemList,
                isSelect && { borderColor: colors.chileanFireOrange },
              ];

              return (
                <TouchableOpacity
                  key={`address-${address.place_id}`}
                  style={getStyle()}
                  onPress={() => {
                    getDetailPlace(address.place_id);
                  }}
                >
                  <View style={styles.titlesItemList}>
                    <Text numberOfLines={1} style={styles.titleItemList}>
                      {address.vicinity}
                    </Text>
                    <Text numberOfLines={1} style={styles.subTitleItemList}>
                      {address.name}
                    </Text>
                  </View>
                  <View style={styles.containerLocationItemList}>
                    <IconLocationMarkerGradient width={12} height={12} />
                    {distance ? (
                      <Text style={styles.titleLocationItemList}>
                        {convertDistance(distance, "km").toFixed(2)} км
                      </Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ButtonCustom
            disabled={!selectAddress}
            title={i18n._("Select")}
            onSubmit={onPressSelect}
          />
        </View>
      ) : null}
    </View>
  );
};
