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

// components
import { ModalUniversal } from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./LocationModal.styles";

export type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "country" | "city", item: any) => void;
  selectedCountry?: string;
};

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedCountry,
}) => {
  const { i18n } = useLocalesProvider();
  const { getSearchCountry, getSearchPlace } = usePlacesProvider();

  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"country" | "city">("country");

  const handleSelect = (item: any) => {
    onSelect(activeTab, item);
    onClose();
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "country" && styles.activeTab]}
          onPress={() => {
            setActiveTab("country");
            setSearchText("");
            setResults([]);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "country" && styles.activeTabText,
            ]}
          >
            {i18n._("Country")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "city" && styles.activeTab,
            !selectedCountry && styles.disabledTab,
          ]}
          onPress={() => {
            if (selectedCountry) {
              setActiveTab("city");
              setSearchText("");
              setResults([]);
            }
          }}
          disabled={!selectedCountry}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "city" && styles.activeTabText,
              !selectedCountry && styles.disabledTabText,
            ]}
          >
            {i18n._("City")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={
            activeTab === "country"
              ? i18n._("Search country...")
              : i18n._("Search city...")
          }
        />
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="#007AFF"
            style={styles.loading}
          />
        )}
      </View>

      <ScrollView style={styles.resultsContainer} nestedScrollEnabled>
        {results.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.resultItem}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.resultText}>{item.en?.name || item.name}</Text>
            {item.en?.short_name && (
              <Text style={styles.resultSubText}>{item.en.short_name}</Text>
            )}
          </TouchableOpacity>
        ))}

        {searchText.length > 0 && !isLoading && results.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              {i18n._("No results found")}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  useEffect(() => {
    if (isOpen) {
      setSearchText("");
      setResults([]);
      setActiveTab(selectedCountry ? "city" : "country");
    }
  }, [isOpen, selectedCountry]);

  useEffect(() => {
    if (searchText.length > 2) {
      setIsLoading(true);

      if (activeTab === "country") {
        getSearchCountry(searchText)
          .then((response) => {
            setResults(response?.resultDB || []);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        getSearchPlace(searchText)
          .then((response) => {
            setResults(response?.resultDB || []);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
      setResults([]);
    }
  }, [searchText, activeTab]);

  return (
    <ModalUniversal visible={isOpen} onClose={onClose}>
      {renderContent()}
    </ModalUniversal>
  );
};
