import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// components
import { Header } from "../../../../../components/Header/Header";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";
import { TTelegramChannelCategory } from "../../../../../storeRedux/apis/telegram-channels/telegram-channels.types";

export type TypeTelegramFilters = {
  category: TTelegramChannelCategory | null;
  country: string;
  city: string;
  verified: boolean;
};

type ModalFilterProps = {
  filters: TypeTelegramFilters | null;
  onClose: () => void;
  onSubmit: (filters: TypeTelegramFilters) => void;
  categoriesData: any;
  countriesData: string[];
  citiesData: string[];
  initialFilters?: TypeTelegramFilters;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  onClose,
  onSubmit,
  categoriesData,
  countriesData,
  citiesData,
  initialFilters,
}) => {
  const { i18n } = useLocalesProvider();

  const [currentFilters, setCurrentFilters] = useState<TypeTelegramFilters>({
    category: null,
    country: "",
    city: "",
    verified: false,
  });

  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    if (initialFilters) {
      setCurrentFilters(initialFilters);
      setSelectedCountry(initialFilters.country || "");
    }
  }, [initialFilters]);

  const handleCategorySelect = (category: TTelegramChannelCategory) => {
    setCurrentFilters((prev) => ({
      ...prev,
      category: prev.category === category ? null : category,
    }));
  };

  const handleCountrySelect = (country: string) => {
    const newCountry = selectedCountry === country ? "" : country;
    setSelectedCountry(newCountry);
    setCurrentFilters((prev) => ({
      ...prev,
      country: newCountry,
      city: newCountry === "" ? "" : prev.city, // Clear city if country changes
    }));
  };

  const handleCitySelect = (city: string) => {
    setCurrentFilters((prev) => ({
      ...prev,
      city: prev.city === city ? "" : city,
    }));
  };

  const handleVerifiedToggle = () => {
    setCurrentFilters((prev) => ({
      ...prev,
      verified: !prev.verified,
    }));
  };

  const handleClearFilters = () => {
    setCurrentFilters({
      category: null,
      country: "",
      city: "",
      verified: false,
    });
    setSelectedCountry("");
  };

  const handleSubmit = () => {
    onSubmit(currentFilters);
  };

  const hasFiltersChanged = useMemo(() => {
    if (!initialFilters) {
      return (
        currentFilters.category !== null ||
        currentFilters.country !== "" ||
        currentFilters.city !== "" ||
        currentFilters.verified
      );
    }

    return (
      initialFilters.category !== currentFilters.category ||
      initialFilters.country !== currentFilters.country ||
      initialFilters.city !== currentFilters.city ||
      initialFilters.verified !== currentFilters.verified
    );
  }, [currentFilters, initialFilters]);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Filter")}
        onPressLeftElement={onClose}
        backgroundStyle={styles.headerBackground}
        rightStyle={styles.containerRightHeader}
      />
      <View style={styles.containerBody}>
        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.label}>{i18n._("Category")}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categoriesData?.data?.map((category: any) => (
              <TouchableOpacity
                key={category.value}
                style={[
                  styles.filterChip,
                  currentFilters.category === category.value &&
                    styles.filterChipActive,
                ]}
                onPress={() => handleCategorySelect(category.value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    currentFilters.category === category.value &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Country Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.label}>{i18n._("Country")}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {countriesData?.map((country: string) => (
              <TouchableOpacity
                key={country}
                style={[
                  styles.filterChip,
                  currentFilters.country === country && styles.filterChipActive,
                ]}
                onPress={() => handleCountrySelect(country)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    currentFilters.country === country &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {country}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* City Filter */}
        {currentFilters.country && (
          <View style={styles.filterSection}>
            <Text style={styles.label}>{i18n._("City")}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {citiesData?.map((city: string) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.filterChip,
                    currentFilters.city === city && styles.filterChipActive,
                  ]}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      currentFilters.city === city &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Verified Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.label}>{i18n._("Verified Only")}</Text>
          <TouchableOpacity
            style={[
              styles.filterChip,
              styles.verifiedChip,
              currentFilters.verified && styles.filterChipActive,
            ]}
            onPress={handleVerifiedToggle}
          >
            <Text
              style={[
                styles.filterChipText,
                currentFilters.verified && styles.filterChipTextActive,
              ]}
            >
              {currentFilters.verified ? i18n._("Yes") : i18n._("No")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Clear Filters */}
        {(currentFilters.category ||
          currentFilters.country ||
          currentFilters.city ||
          currentFilters.verified) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}
          >
            <Text style={styles.clearButtonText}>
              {i18n._("Clear Filters")}
            </Text>
          </TouchableOpacity>
        )}

        <ButtonCustom
          title={i18n._("Apply Filters")}
          onSubmit={handleSubmit}
          styleContainer={styles.buttonSubmit}
          disabled={!hasFiltersChanged}
        />
      </View>
    </View>
  );
};
