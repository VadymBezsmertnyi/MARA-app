import React, { FunctionComponent, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// redux
import { useGetEventsLocationsQuery } from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import BottomSheetUniversal from "../../../../../components/BottomSheetUniversal/BottomSheetUniversal";
import { ArrowDown, IconLocationMarker } from "../../../../../icons/components";

// types
import {
  CountryDbType,
  PlaceDbType,
} from "../../../../../providers/PlacesProvider/PlacesProvider.types";

// styles
import colors from "../../../../../../styles/colors";
import { styles } from "./EventLocationButtonSheet.styles";

type Props = {
  eventStatus?: "past" | "upcoming";
  selectedCountryId?: string | null;
  selectedPlaceId?: string | null;
  onSelectCountry: (countryId: string | null) => void;
  onSelectPlace: (placeId: string | null) => void;
};

export const EventLocationButtonSheet: FunctionComponent<Props> = ({
  eventStatus,
  selectedCountryId,
  selectedPlaceId,
  onSelectCountry,
  onSelectPlace,
}) => {
  const { i18n, language } = useLocalesProvider();
  const { bottom } = useSafeAreaInsets();
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPlaceOpen, setIsPlaceOpen] = useState(false);
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [placeSearchValue, setPlaceSearchValue] = useState("");

  const { data: locationsData } = useGetEventsLocationsQuery({
    eventStatus,
  });

  const countries = useMemo(
    () => locationsData?.countries || [],
    [locationsData]
  );
  const places = useMemo(() => locationsData?.places || [], [locationsData]);

  const filteredPlaces = useMemo(() => {
    if (!selectedCountryId) return places;
    return places.filter(
      (place) => place.country_place_id === selectedCountryId
    );
  }, [places, selectedCountryId]);

  const selectedCountry = useMemo(
    () => countries.find((c) => c._id === selectedCountryId),
    [countries, selectedCountryId]
  );
  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p._id === selectedPlaceId),
    [filteredPlaces, selectedPlaceId]
  );

  const buttonTitle = useMemo(() => {
    if (selectedPlace) return selectedPlace[language].formatted_address;
    if (selectedCountry) return selectedCountry[language].long_name;
    return i18n._("All locations");
  }, [selectedPlace, selectedCountry, language, i18n]);

  const isPlaceholder = useMemo(
    () => !selectedPlace && !selectedCountry,
    [selectedPlace, selectedCountry]
  );

  const showListCountries = useMemo(() => {
    return [null as CountryDbType | null, ...countries].filter((country) => {
      if (!countrySearchValue.length) return true;
      if (!country) return true;
      return country[language].long_name
        .toLocaleLowerCase()
        .includes(countrySearchValue.toLocaleLowerCase());
    });
  }, [countries, countrySearchValue, language]);

  const showListPlaces = useMemo(() => {
    return [null as PlaceDbType | null, ...filteredPlaces].filter((place) => {
      if (!placeSearchValue.length) return true;
      if (!place) return true;
      return place[language].formatted_address
        .toLocaleLowerCase()
        .includes(placeSearchValue.toLocaleLowerCase());
    });
  }, [filteredPlaces, placeSearchValue, language]);

  const closeSheet = () => {
    setIsOpenSheet(false);
    setIsCountryOpen(false);
    setIsPlaceOpen(false);
  };

  const sheetContentStyle = useMemo(
    () => [
      styles.sheetContent,
      styles.sheetContentBottomPadding,
      {
        paddingBottom: bottom + styles.sheetContentBottomPadding.paddingBottom,
      },
    ],
    [bottom]
  );

  const onSelectCountryHandler = (country: CountryDbType | null) => {
    if (!country) {
      onSelectCountry(null);
      setCountrySearchValue("");
    } else if (country._id === selectedCountryId) {
      onSelectCountry(null);
      setCountrySearchValue("");
    } else {
      onSelectCountry(country._id);
      setCountrySearchValue(country[language].long_name || "");
      // when country changes, reset place
      onSelectPlace(null);
      setPlaceSearchValue("");
    }
    setIsCountryOpen(false);
  };

  const onSelectPlaceHandler = (place: PlaceDbType | null) => {
    if (!place) {
      onSelectPlace(null);
      setPlaceSearchValue("");
    } else if (place._id === selectedPlaceId) {
      onSelectPlace(null);
      setPlaceSearchValue("");
    } else {
      onSelectPlace(place._id);
      setPlaceSearchValue(place[language].formatted_address || "");
    }
    setIsPlaceOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsOpenSheet(true);
        }}
        accessibilityLabel={i18n._("Select country or city")}
      >
        <View style={styles.buttonLeft}>
          <IconLocationMarker
            width={16}
            height={16}
            fill={colors.californiaOrange}
          />
          <Text
            style={[
              styles.buttonText,
              isPlaceholder && styles.buttonTextPlaceholder,
            ]}
            numberOfLines={1}
          >
            {buttonTitle}
          </Text>
        </View>
        <ArrowDown width={16} height={16} fill={colors.black} />
      </TouchableOpacity>
      <BottomSheetUniversal
        isOpen={isOpenSheet}
        onClose={closeSheet}
        snapPoints={["70%"]}
        styleContent={sheetContentStyle}
      >
        <Text style={styles.sheetTitle}>{i18n._("Location")}</Text>
        <View
          style={[
            styles.selectContainer,
            isCountryOpen && styles.selectContainerOpen,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setIsCountryOpen((s) => !s);
              setIsPlaceOpen(false);
            }}
          >
            <View
              style={[
                styles.selectHeader,
                isCountryOpen && styles.selectHeaderOpen,
              ]}
            >
              {!isCountryOpen ? (
                <IconLocationMarker
                  width={16}
                  height={16}
                  fill={colors.californiaOrange}
                />
              ) : null}
              <TextInput
                style={[styles.input, isCountryOpen && styles.inputOpen]}
                placeholder={i18n._("All countries")}
                value={countrySearchValue}
                onChangeText={setCountrySearchValue}
                editable={isCountryOpen}
                pointerEvents={isCountryOpen ? "auto" : "none"}
                autoFocus={isCountryOpen}
              />
              {!isCountryOpen ? (
                <ArrowDown width={16} height={16} fill={colors.black} />
              ) : null}
            </View>
          </TouchableOpacity>

          {isCountryOpen ? (
            <ScrollView style={styles.dropdownList}>
              {showListCountries.length ? (
                showListCountries.map((country) =>
                  country ? (
                    <TouchableHighlight
                      underlayColor={colors.grayMercury}
                      key={`select-country-${country._id}`}
                      onPress={() => onSelectCountryHandler(country)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>
                        {country[language].long_name}
                      </Text>
                    </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                      underlayColor={colors.grayMercury}
                      key="select-country-all"
                      onPress={() => onSelectCountryHandler(null)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>
                        {i18n._("All countries")}
                      </Text>
                    </TouchableHighlight>
                  )
                )
              ) : (
                <Text style={styles.noResultsText}>
                  {i18n._("No countries found")}
                </Text>
              )}
            </ScrollView>
          ) : null}
        </View>
        <View style={styles.divider} />
        <View
          style={[
            styles.selectContainer,
            isPlaceOpen && styles.selectContainerOpen,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setIsPlaceOpen((s) => !s);
              setIsCountryOpen(false);
            }}
          >
            <View
              style={[
                styles.selectHeader,
                isPlaceOpen && styles.selectHeaderOpen,
              ]}
            >
              {!isPlaceOpen ? (
                <IconLocationMarker
                  width={16}
                  height={16}
                  fill={colors.californiaOrange}
                />
              ) : null}
              <TextInput
                style={[styles.input, isPlaceOpen && styles.inputOpen]}
                placeholder={i18n._("All cities")}
                value={placeSearchValue}
                onChangeText={setPlaceSearchValue}
                editable={isPlaceOpen}
                pointerEvents={isPlaceOpen ? "auto" : "none"}
                autoFocus={isPlaceOpen}
              />
              {!isPlaceOpen ? (
                <ArrowDown width={16} height={16} fill={colors.black} />
              ) : null}
            </View>
          </TouchableOpacity>

          {isPlaceOpen ? (
            <ScrollView style={styles.dropdownList}>
              {showListPlaces.length ? (
                showListPlaces.map((place) =>
                  place ? (
                    <TouchableHighlight
                      underlayColor={colors.grayMercury}
                      key={`select-place-${place._id}`}
                      onPress={() => onSelectPlaceHandler(place)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>
                        {place[language].formatted_address}
                      </Text>
                    </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                      underlayColor={colors.grayMercury}
                      key="select-place-all"
                      onPress={() => onSelectPlaceHandler(null)}
                      style={styles.dropdownItem}
                    >
                      <Text style={styles.dropdownItemText}>
                        {i18n._("All cities")}
                      </Text>
                    </TouchableHighlight>
                  )
                )
              ) : (
                <Text style={styles.noResultsText}>
                  {i18n._("No cities found")}
                </Text>
              )}
            </ScrollView>
          ) : null}
        </View>
      </BottomSheetUniversal>
    </>
  );
};
