import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, Platform, ScrollView, Text, View } from "react-native";
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";

// types
import { ItemSearchPlaceAddressType } from "./ModalSheetSearchPlaceAddress.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

//components
import { ModalSheetSearchPlace } from "../ModalSheetSearchPlace/ModalSheetSearchPlace";
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { Input } from "../Input/Input";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";

// styles
import { styles } from "./ModalSheetSearchPlaceAddress.styles";

type ModalSheetSearchPlaceAddressProps = {
  isOpen: boolean;
  statePlace?: ItemSearchPlaceAddressType;
  onClose: () => void;
  onSubmit: (place: ItemSearchPlaceAddressType) => void;
};

const DEFAULT_PLACE_ADDRESS_DATA: ItemSearchPlaceAddressType = {
  placeId: "",
  title: "",
  address: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

export const ModalSheetSearchPlaceAddress: FunctionComponent<
  ModalSheetSearchPlaceAddressProps
> = ({ isOpen, statePlace, onClose, onSubmit }) => {
  const { i18n } = useLocalesProvider();
  const [place, setPlace] = useState<ItemSearchPlaceAddressType | null>(null);
  const [step, setStep] = useState(0);
  const currentStatePlace = useMemo(
    () => (place ? { placeId: place.placeId, title: place.title } : undefined),
    [place]
  );
  const offsetShadow: [x: string | number, y: string | number] = useMemo(
    () => [0, 3],
    []
  );

  const onPressSubmit = () => {
    if (place) onSubmit(place);
  };

  const onPressBack = () => {
    setStep((state) => (state > 0 ? state - 1 : state));
  };

  const onPressNext = () => {
    setStep((state) => (state < 2 ? state + 1 : state));
  };

  const getPlaces = (event: MapPressEvent) => {
    const {
      coordinate: { latitude, longitude },
    } = event.nativeEvent;
    setPlace((state) => ({
      ...DEFAULT_PLACE_ADDRESS_DATA,
      ...state,
      coordinates: { latitude, longitude },
    }));
  };

  useEffect(() => {
    if (!isOpen) setStep(0);
    if (isOpen && statePlace) setPlace(statePlace);
  }, [isOpen]);

  if (step === 0 && isOpen)
    return (
      <ModalSheetSearchPlace
        isOpen={step === 0 && isOpen}
        onClose={onClose}
        onSubmit={(newPlace) => {
          setPlace((state) =>
            state
              ? { ...state, ...newPlace }
              : {
                  ...DEFAULT_PLACE_ADDRESS_DATA,
                  ...newPlace,
                }
          );
          setStep((state) => state + 1);
        }}
        statePlace={currentStatePlace}
      />
    );

  if (step === 1 && isOpen)
    return (
      <Modal visible={isOpen} transparent>
        <ModalsSheet isShow={isOpen} onClose={onClose}>
          <View style={styles.container}>
            <Shadow stretch disabled={step > 1}>
              <View style={styles.containerHeader}>
                <Text style={styles.title}>{i18n._("Event address")}</Text>
                <LinearGradientCustom style={styles.lineHeader} />
              </View>
            </Shadow>
            <View style={styles.container}>
              <ScrollView style={styles.containerInputs}>
                <Input
                  isRegular
                  label={i18n._("Enter the exact address")}
                  placeholder={i18n._("Independence Street, 1")}
                  value={place?.address || ""}
                  onChange={(value) => {
                    setPlace((state) => ({
                      ...DEFAULT_PLACE_ADDRESS_DATA,
                      ...state,
                      address: value,
                    }));
                  }}
                  containerStyle={styles.input}
                />
              </ScrollView>
              <View>
                <Shadow stretch disabled={step > 1}>
                  <View style={styles.containerSubmitModalTypeWork}>
                    <ButtonCustom
                      disabled={!place?.address.length}
                      title={i18n._("Continue")}
                      onSubmit={onPressNext}
                    />
                    <ButtonCustom
                      type="transparent"
                      disabled={false}
                      title={i18n._("Back")}
                      onSubmit={onPressBack}
                    />
                  </View>
                </Shadow>
              </View>
            </View>
          </View>
        </ModalsSheet>
      </Modal>
    );

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
        <View style={styles.container}>
          <Shadow stretch disabled={step > 1}>
            <View style={styles.containerHeader}>
              <Text style={styles.titleCoordinates}>
                <Trans>Select a location on the map</Trans>
              </Text>
              <Text style={styles.subTitleCoordinates}>
                <Trans>Move and change the location</Trans>
              </Text>
            </View>
          </Shadow>
          <View style={styles.containerMap}>
            <MapView
              onPress={getPlaces}
              initialRegion={DEFAULT_LOCATION}
              region={DEFAULT_LOCATION}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              mapType={Platform.OS === "ios" ? "terrain" : "standard"}
              zoomControlEnabled
              showsBuildings={false}
              showsPointsOfInterest={false}
              showsIndoorLevelPicker={false}
            >
              {place?.coordinates ? (
                <Marker coordinate={place.coordinates} />
              ) : null}
            </MapView>
            {place?.coordinates && place?.coordinates.latitude !== 0 ? (
              <View style={styles.containerLineCoordinates}>
                <Shadow stretch offset={offsetShadow} distance={4}>
                  <View style={styles.lineCoordinates}>
                    <Text style={styles.titleLineCoordinates}>
                      {place.coordinates.latitude.toFixed(6)},
                      {place.coordinates.longitude.toFixed(6)}
                    </Text>
                  </View>
                </Shadow>
              </View>
            ) : null}
          </View>
          <View>
            <Shadow stretch disabled={step > 1}>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  disabled={!(place?.coordinates.latitude !== 0)}
                  title={i18n._("Select")}
                  onSubmit={onPressSubmit}
                />
                <ButtonCustom
                  type="transparent"
                  disabled={false}
                  title={i18n._("Back")}
                  onSubmit={onPressBack}
                />
              </View>
            </Shadow>
          </View>
        </View>
      </ModalsSheet>
    </Modal>
  );
};
