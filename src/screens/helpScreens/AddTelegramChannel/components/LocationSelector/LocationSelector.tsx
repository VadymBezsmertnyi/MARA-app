import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { usePlacesProvider } from "../../../../../providers/PlacesProvider/PlacesProvider";

// styles
import { styles } from "./LocationSelector.styles";

export type LocationSelectorProps = {
  selectedCountry: string;
  selectedCity: string;
  onCountryChange: (countryId: string) => void;
  onCityChange: (cityId: string) => void;
};

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}) => {
  const { i18n } = useLocalesProvider();
  const { getSearchCountry, getSearchPlace } = usePlacesProvider();

  const [countrySearch, setCountrySearch] = useState<string>("");
  const [citySearch, setCitySearch] = useState<string>("");
  const [countryResults, setCountryResults] = useState<any[]>([]);
  const [cityResults, setCityResults] = useState<any[]>([]);
  const [isCountryLoading, setIsCountryLoading] = useState<boolean>(false);
  const [isCityLoading, setIsCityLoading] = useState<boolean>(false);

  const handleCountrySelect = (country: any) => {
    onCountryChange(country._id);
    setCountrySearch(country.name);
    setCountryResults([]);
    setCitySearch("");
    onCityChange("");
  };

  const handleCitySelect = (city: any) => {
    onCityChange(city._id);
    setCitySearch(city.name);
    setCityResults([]);
  };

  useEffect(() => {
    if (countrySearch.length > 2) {
      setIsCountryLoading(true);
      getSearchCountry(countrySearch)
        .then((results) => {
          setCountryResults(results?.resultDB || []);
        })
        .finally(() => {
          setIsCountryLoading(false);
        });
    } else setCountryResults([]);
  }, [countrySearch]);

  useEffect(() => {
    if (selectedCountry && citySearch.length > 2) {
      setIsCityLoading(true);
      getSearchPlace(citySearch)
        .then((results) => {
          setCityResults(results?.resultDB || []);
        })
        .finally(() => {
          setIsCityLoading(false);
        });
    } else setCityResults([]);
  }, [citySearch, selectedCountry]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{i18n._("Country")} *</Text>
        <TextInput
          style={styles.input}
          value={countrySearch}
          onChangeText={setCountrySearch}
          placeholder={i18n._("Search country...")}
        />
        {isCountryLoading && <ActivityIndicator size="small" color="#007AFF" />}
        {countryResults.length > 0 && (
          <ScrollView style={styles.resultsContainer} nestedScrollEnabled>
            {countryResults.map((country) => (
              <TouchableOpacity
                key={country._id}
                style={styles.resultItem}
                onPress={() => handleCountrySelect(country)}
              >
                <Text style={styles.resultText}>{country.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      {selectedCountry && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{i18n._("City")} *</Text>
          <TextInput
            style={styles.input}
            value={citySearch}
            onChangeText={setCitySearch}
            placeholder={i18n._("Search city...")}
          />
          {isCityLoading && <ActivityIndicator size="small" color="#007AFF" />}
          {cityResults.length > 0 && (
            <ScrollView style={styles.resultsContainer} nestedScrollEnabled>
              {cityResults.map((city) => (
                <TouchableOpacity
                  key={city._id}
                  style={styles.resultItem}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text style={styles.resultText}>{city.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};
