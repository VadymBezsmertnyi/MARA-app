import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform, Text, View } from "react-native";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import axios from "axios";
import { Trans } from "@lingui/macro";
import qs from "qs";
import { getDistance } from "geolib";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// types
import { NearbySearchGoogleType } from "./MapLocationModal.types";
import { GoogleLocationDetailResult } from "react-native-google-autocomplete/dist/services/Google.service";

// providers
import { themeContext } from "../../../theme/theme.provider";
import { localesContext } from "../../../../../localization/localization.provider";
import { mapContext } from "../../../MapProvider/MapProvider";

// components
import { ButtonCustom } from "../../../../components/ButtonCustom/ButtonCustom";
import { AddressLocation } from "./components/AddressLocation/AddressLocation";
import { NotAddressLocation } from "./components/NotAddressLocation/NotAddressLocation";
import { Input } from "../../../../components/Input/Input";

// constants
import { DEFAULT_MAP_PLACE } from "./MapLocationModal.constants";

// styles
import { styles } from "./MapLocationModal.styles";

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
  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const [vicinity, setVicinity] = useState("");
  const isNext = useMemo(() => {
    if (selectAddress && !isCustomAddress) return true;
    else if (isCustomAddress && vicinity.length > 5) return true;
    return false;
  }, [selectAddress, isCustomAddress, vicinity]);

  const toggleCustomAddress = (value: boolean) => {
    setIsCustomAddress(value);
    setSelectAddress(null);
  };

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

    if (result.data.status === "OK") setSelectAddress(result.data.result);
    setIsCustomAddress(false);
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
    const [firstAddress] = listAddress;
    if (selectAddress && !isCustomAddress) setLocation(selectAddress);
    else if (isCustomAddress && vicinity.length > 5)
      setLocation({
        ...DEFAULT_MAP_PLACE,
        geometry: firstAddress.geometry,
        name: firstAddress.name,
        vicinity,
      });
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
      <View style={styles.containerMap}>
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
        {isCustomAddress ? (
          <View style={styles.containerInput}>
            <Input
              placeholder={i18n._("Enter the address")}
              value={vicinity}
              onChange={setVicinity}
            />
          </View>
        ) : null}
      </View>
      {listAddress.length ? (
        <View style={styles.containerFooter}>
          <BottomSheetScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
          >
            {listAddress.map((address) => {
              const distance = location
                ? getDistance(location, address.geometry.location)
                : null;
              const isSelect = address.place_id === selectAddress?.place_id;

              return (
                <AddressLocation
                  key={`address-${address.place_id}`}
                  address={address}
                  distance={distance}
                  isSelect={isSelect}
                  getDetailPlace={getDetailPlace}
                />
              );
            })}
            <NotAddressLocation
              address={listAddress[0]}
              isSelect={isCustomAddress}
              onEnterPlace={toggleCustomAddress}
            />
          </BottomSheetScrollView>
          <ButtonCustom
            disabled={!isNext}
            title={i18n._("Select")}
            onSubmit={onPressSelect}
          />
        </View>
      ) : null}
    </View>
  );
};
