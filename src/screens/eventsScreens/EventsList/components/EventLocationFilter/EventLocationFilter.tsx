import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

// redux
import { useGetEventsLocationsQuery } from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { ArrowDown, IconLocationMarker } from "../../../../../icons/components";

// types
import {
  CountryDbType,
  PlaceDbType,
} from "../../../../../providers/PlacesProvider/PlacesProvider.types";

// styles
import colors from "../../../../../../styles/colors";
import { styles } from "./EventLocationFilter.styles";

type EventLocationFilterProps = {
  eventStatus?: "past" | "upcoming";
  selectedCountryId?: string | null;
  selectedPlaceId?: string | null;
  onSelectCountry: (countryId: string | null) => void;
  onSelectPlace: (placeId: string | null) => void;
};

export const EventLocationFilter: FunctionComponent<
  EventLocationFilterProps
> = ({
  eventStatus,
  selectedCountryId,
  selectedPlaceId,
  onSelectCountry,
  onSelectPlace,
}) => {
  const { i18n, language } = useLocalesProvider();
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

  const showListCountries = useMemo(
    () =>
      [null, ...countries].filter((country) =>
        countrySearchValue.length && country
          ? country[language].long_name
              .toLocaleLowerCase()
              .includes(countrySearchValue.toLocaleLowerCase())
          : true
      ),
    [countries, countrySearchValue, language]
  );

  const showListPlaces = useMemo(
    () =>
      [null, ...filteredPlaces].filter((place) =>
        placeSearchValue.length && place
          ? place[language].formatted_address
              .toLocaleLowerCase()
              .includes(placeSearchValue.toLocaleLowerCase())
          : true
      ),
    [filteredPlaces, placeSearchValue, language]
  );

  const selectedCountry = useMemo(
    () => countries.find((c) => c._id === selectedCountryId),
    [countries, selectedCountryId]
  );

  const selectedPlace = useMemo(
    () => filteredPlaces.find((p) => p._id === selectedPlaceId),
    [filteredPlaces, selectedPlaceId]
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

  const countryDisplayText = useMemo(() => {
    if (countrySearchValue && selectedCountry) return countrySearchValue;
    if (selectedCountry) return selectedCountry[language].long_name;
    return i18n._("All countries");
  }, [countrySearchValue, selectedCountry, language, i18n]);

  const placeDisplayText = useMemo(() => {
    if (placeSearchValue && selectedPlace) return placeSearchValue;
    if (selectedPlace) return selectedPlace[language].formatted_address;
    return i18n._("All cities");
  }, [placeSearchValue, selectedPlace, language, i18n]);

  return (
    <>
      {isCountryOpen || isPlaceOpen ? (
        <Pressable
          style={styles.backgroundButton}
          onPress={() => {
            setIsCountryOpen(false);
            setIsPlaceOpen(false);
          }}
        />
      ) : null}
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            disabled={isCountryOpen}
            style={[
              styles.selectContainer,
              isCountryOpen && styles.selectContainerOpen,
            ]}
            onPress={() => {
              setIsCountryOpen(true);
              setIsPlaceOpen(false);
            }}
          >
            <View style={styles.containerInput}>
              <IconLocationMarker
                width={16}
                height={16}
                fill={colors.californiaOrange}
              />
              {isCountryOpen ? (
                <TextInput
                  style={styles.input}
                  placeholder={i18n._("All countries")}
                  value={countrySearchValue}
                  onChangeText={setCountrySearchValue}
                  onFocus={() => {
                    setIsCountryOpen(true);
                  }}
                  onBlur={() => {
                    setIsCountryOpen(false);
                  }}
                />
              ) : (
                <View style={styles.input}>
                  <Text style={styles.titleInput}>{countryDisplayText}</Text>
                </View>
              )}
              {isCountryOpen ? (
                <View style={styles.arrowToUp}>
                  <ArrowDown width={16} height={16} fill={colors.black} />
                </View>
              ) : (
                <ArrowDown width={16} height={16} fill={colors.black} />
              )}
            </View>
            {isCountryOpen ? (
              <ScrollView
                style={styles.dropdownList}
                contentContainerStyle={styles.dropdownListContent}
              >
                {showListCountries.length > 1 ? (
                  showListCountries.map((country) =>
                    country ? (
                      <TouchableHighlight
                        underlayColor={colors.grayMercury}
                        key={`select-country-${country._id}`}
                        onPress={() => {
                          onSelectCountryHandler(country);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>{country[language].long_name}</Text>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        underlayColor={colors.grayMercury}
                        key="select-country-all"
                        onPress={() => {
                          onSelectCountryHandler(null);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>{i18n._("All countries")}</Text>
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
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <TouchableOpacity
            disabled={isPlaceOpen}
            style={[
              styles.selectContainer,
              isPlaceOpen && styles.selectContainerOpen,
            ]}
            onPress={() => {
              setIsPlaceOpen(true);
              setIsCountryOpen(false);
            }}
          >
            <View style={styles.containerInput}>
              <IconLocationMarker
                width={16}
                height={16}
                fill={colors.californiaOrange}
              />
              {isPlaceOpen ? (
                <TextInput
                  style={styles.input}
                  placeholder={i18n._("All cities")}
                  value={placeSearchValue}
                  onChangeText={setPlaceSearchValue}
                  onFocus={() => {
                    setIsPlaceOpen(true);
                  }}
                  onBlur={() => {
                    setIsPlaceOpen(false);
                  }}
                />
              ) : (
                <View style={styles.input}>
                  <Text style={styles.titleInput}>{placeDisplayText}</Text>
                </View>
              )}
              {isPlaceOpen ? (
                <View style={styles.arrowToUp}>
                  <ArrowDown width={16} height={16} fill={colors.black} />
                </View>
              ) : (
                <ArrowDown width={16} height={16} fill={colors.black} />
              )}
            </View>
            {isPlaceOpen ? (
              <ScrollView
                style={styles.dropdownList}
                contentContainerStyle={styles.dropdownListContent}
              >
                {showListPlaces.length > 1 ? (
                  showListPlaces.map((place) =>
                    place ? (
                      <TouchableHighlight
                        underlayColor={colors.grayMercury}
                        key={`select-place-${place._id}`}
                        onPress={() => {
                          onSelectPlaceHandler(place);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>
                          {place[language].formatted_address ||
                            i18n._("All cities")}
                        </Text>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        underlayColor={colors.grayMercury}
                        key="select-place-all"
                        onPress={() => {
                          onSelectPlaceHandler(null);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text>{i18n._("All cities")}</Text>
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
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
