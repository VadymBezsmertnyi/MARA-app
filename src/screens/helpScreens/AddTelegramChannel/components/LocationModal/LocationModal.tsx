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
import {
  CountryDbType,
  PlaceDbType,
} from "../../../../../providers/PlacesProvider/PlacesProvider.types";

export type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    type: "country" | "city",
    item: CountryDbType | PlaceDbType
  ) => void;
  selectedCountry?: string;
  selectedLocation?: {
    country?: CountryDbType | null;
    city?: PlaceDbType | null;
  };
};

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedLocation,
}) => {
  const { i18n, language } = useLocalesProvider();
  const { getSearchCountry, getSearchPlace } = usePlacesProvider();
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Array<CountryDbType | PlaceDbType>>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"country" | "city">("country");
  const [selectedData, setSelectedData] = useState<{
    country?: CountryDbType | null;
    city?: PlaceDbType | null;
  }>({});

  const handleSelect = (item: any) => {
    const newSelectedData = { ...selectedData };
    if (activeTab === "country") {
      newSelectedData.country = item;
      newSelectedData.city = undefined; // Reset city when country changes
    } else newSelectedData.city = item;

    setSelectedData(newSelectedData);
    onSelect(activeTab, item);

    if (activeTab === "country") {
      setActiveTab("city");
      setSearchText("");
      setResults([]);
    } else onClose();
  };

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "country" && styles.activeTab,
            selectedData.country && styles.selectedTab,
          ]}
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
              selectedData.country && styles.selectedTabText,
            ]}
          >
            {i18n._("Country")}
            {selectedData.country && (
              <Text style={styles.selectedIndicator}> ✓</Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "city" && styles.activeTab,
            !selectedData.country && styles.disabledTab,
            selectedData.city && styles.selectedTab,
          ]}
          onPress={() => {
            if (selectedData.country) {
              setActiveTab("city");
              setSearchText("");
              setResults([]);
            }
          }}
          disabled={!selectedData.country}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "city" && styles.activeTabText,
              !selectedData.country && styles.disabledTabText,
              selectedData.city && styles.selectedTabText,
            ]}
          >
            {i18n._("City")}
            {selectedData.city && (
              <Text style={styles.selectedIndicator}> ✓</Text>
            )}
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
        {results.map((item) => {
          const isSelected =
            (activeTab === "country" &&
              selectedData.country?._id === item._id) ||
            (activeTab === "city" && selectedData.city?._id === item._id);
          const fullData = item[language] || item["en"];
          const short_name =
            "short_name" in fullData
              ? fullData.short_name
              : fullData.formatted_address;
          const name = "name" in fullData ? fullData.name : fullData.main_text;

          return (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.resultItem,
                isSelected && styles.selectedResultItem,
              ]}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.resultContent}>
                <Text
                  style={[
                    styles.resultText,
                    isSelected && styles.selectedResultText,
                  ]}
                >
                  {name}
                </Text>
                {short_name && (
                  <Text
                    style={[
                      styles.resultSubText,
                      isSelected && styles.selectedResultSubText,
                    ]}
                  >
                    {short_name}
                  </Text>
                )}
              </View>
              {isSelected && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          );
        })}

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
      if (selectedLocation) {
        setSelectedData(selectedLocation);
        setActiveTab(selectedLocation.city ? "city" : "country");
      } else {
        setSelectedData({});
        setActiveTab("country");
      }
    }
  }, [isOpen, selectedLocation]);

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
