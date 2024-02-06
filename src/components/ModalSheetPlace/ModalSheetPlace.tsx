import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Trans } from "@lingui/macro";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

// types
import { PlaceType } from "../../providers/PlacesProvider/PlacesProvider.types";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { placesContext } from "../../providers/PlacesProvider/PlacesProvider";
import { themeContext } from "../../providers/ThemeProvider/ThemeProvider";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { Input } from "../Input/Input";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";

// icons
import { IconSearchInput } from "../../icons/components";

// styles
import { styles } from "./ModalSheetPlace.styles";

const DEFAULT_LOCATION = {
  longitude: 31.976197008043528,
  latitude: 49.63489179964168,
  latitudeDelta: 7.273602506374104,
  longitudeDelta: 7.446565590798844,
};

type ModalSheetPlaceProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (date: PlaceType) => void;
};

type StepModal = "country" | "region" | "address" | "coordinate";
const STEPS: StepModal[] = ["country", "region", "address", "coordinate"];

export const ModalSheetPlace: FunctionComponent<ModalSheetPlaceProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
}) => {
  const { i18n, language } = useContext(localesContext);
  const { theme } = useContext(themeContext);
  const { places } = useContext(placesContext);
  const [selectCountryIso, setSelectCountryIso] = useState<string | null>(null);
  const [selectRegionId, setSelectRegionId] = useState<string | null>(null);
  const [region, setRegion] = useState(DEFAULT_LOCATION);
  const [coordinates, setCoordinates] = useState<LatLng | null>(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(0);
  const showCountry = useMemo(
    () => (places ? Object.keys(places) : []),
    [places]
  );
  const isEnd = useMemo(() => step === STEPS.length - 1, [step]);
  const stepName = useMemo(() => STEPS[step], [step]);
  const isNextStep = useMemo(() => {
    if (stepName === "country") return selectCountryIso !== null;
    if (stepName === "region") return selectRegionId !== null;
    if (stepName === "address") return city.length >= 4 && address.length >= 4;
    if (stepName === "coordinate") return coordinates !== null;
    return false;
  }, [selectCountryIso, selectRegionId, city, address, coordinates, step]);

  const getPlaces = (event: MapPressEvent) => {
    const {
      coordinate: { latitude, longitude },
    } = event.nativeEvent;
    setCoordinates({ latitude, longitude });
  };

  const showElement = useMemo(() => {
    if (stepName === "country")
      return (
        <ScrollView style={styles.containerList}>
          {showCountry.map((countryIso) => {
            const isFind = search.length
              ? places?.[countryIso]?.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : true;
            const isShow = places?.[countryIso]?.isShow && isFind;
            return isShow ? (
              <TouchableOpacity
                key={`country-${countryIso}-${places[countryIso].id}`}
                style={styles.containerItemList}
                onPress={() => {
                  setSelectCountryIso((state) =>
                    state === countryIso ? null : countryIso
                  );
                }}
              >
                <Text>{places[countryIso].title}</Text>
                <CheckboxPoint isSelect={countryIso === selectCountryIso} />
              </TouchableOpacity>
            ) : null;
          })}
        </ScrollView>
      );
    if (stepName === "region") {
      const regions =
        selectCountryIso && places?.[selectCountryIso].regions
          ? places[selectCountryIso].regions
          : [];
      return (
        <ScrollView style={styles.containerList}>
          {regions.map((region) => {
            const isFind = search.length
              ? Object.values(region.name).filter((name) =>
                  name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                ).length > 0
              : true;
            const isShow = region.isShow && isFind;
            return isShow ? (
              <TouchableOpacity
                key={`country-${selectCountryIso}-${region.id}`}
                style={styles.containerItemList}
                onPress={() => {
                  setSelectRegionId((state) =>
                    state === region.placeId ? null : region.placeId
                  );
                }}
              >
                <Text>{region.name[language || "en"]}</Text>
                <CheckboxPoint isSelect={selectRegionId === region.placeId} />
              </TouchableOpacity>
            ) : null;
          })}
          <View style={styles.containerEmpty} />
        </ScrollView>
      );
    }
    if (stepName === "address")
      return (
        <View style={styles.containerInputs}>
          <Input
            isRegular
            label={i18n._("Enter the name of the locality")}
            placeholder={i18n._("Kyiv")}
            value={city}
            onChange={setCity}
            containerStyle={styles.input}
          />
          <Input
            isRegular
            label={i18n._("Enter the exact address")}
            placeholder={i18n._("Independence Street, 1")}
            value={address}
            onChange={setAddress}
            containerStyle={styles.input}
          />
        </View>
      );
    if (stepName === "coordinate")
      return (
        <View style={styles.containerMap}>
          <MapView
            onPress={getPlaces}
            initialRegion={DEFAULT_LOCATION}
            region={region}
            onRegionChange={(event) => {
              if (stepName === "coordinate") setRegion(event);
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
            {coordinates ? <Marker coordinate={coordinates} /> : null}
          </MapView>
          {coordinates ? (
            <View style={styles.containerLineCoordinates}>
              <View style={styles.lineCoordinates}>
                <Text style={styles.titleLineCoordinates}>
                  {coordinates.latitude.toFixed(6)},
                  {coordinates.longitude.toFixed(6)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      );
    return null;
  }, [
    selectCountryIso,
    selectRegionId,
    city,
    address,
    coordinates,
    step,
    search,
  ]);

  const onPressBack = () => {
    setSearch("");
    if (step === 0) onClose();
    else setStep((state) => state - 1);
  };

  const onPressNext = () => {
    setSearch("");
    const isPreEnd = step === STEPS.length - 2;
    if (isPreEnd) setRegion(DEFAULT_LOCATION);
    if (isEnd && places && selectCountryIso && coordinates) {
      const countrySelect = places[selectCountryIso];
      const regionSelect =
        countrySelect.regions.find(
          (region) => region.placeId === selectRegionId
        ) || null;
      const submitData = regionSelect
        ? {
            countryId: countrySelect.id,
            regionPlaceId: regionSelect.placeId,
            city,
            address,
            coordinates,
          }
        : null;

      if (submitData) onSubmit(submitData);
    } else setStep((state) => state + 1);
  };

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
        <View style={styles.container}>
          <Shadow stretch disabled={step > 1}>
            <View style={styles.containerHeader}>
              {isEnd ? (
                <>
                  <Text style={styles.titleCoordinates}>
                    <Trans>Select a location on the map</Trans>
                  </Text>
                  <Text style={styles.subTitleCoordinates}>
                    <Trans>Move and change the location</Trans>
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.title}>
                    <Trans>{title}</Trans>
                  </Text>
                  <LinearGradientCustom style={styles.lineHeader} />
                </>
              )}
              {step <= 1 ? (
                <Input
                  isSelect
                  label={i18n._("Select country")}
                  placeholder={i18n._("Enter text to search")}
                  value={search}
                  onChange={setSearch}
                  InputIcon={<IconSearchInput width={26} height={26} />}
                  containerStyle={styles.inputSearch}
                />
              ) : null}
            </View>
          </Shadow>
          {showElement}
          <View>
            <Shadow stretch disabled={step > 1}>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  disabled={!isNextStep}
                  title={isEnd ? i18n._("Select") : i18n._("Continue")}
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
      </ModalsSheet>
    </Modal>
  );
};
