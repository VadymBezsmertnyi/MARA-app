import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { BlurView } from "expo-blur";

// redux
import { useUserSelector } from "../../../../../storeRedux/apis/user/slice";
import { useEditUserMutation } from "../../../../../storeRedux/api";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMapProvider } from "../../../../../providers/MapProvider/MapProvider";

// components
import { Header } from "../../../../../components/Header/Header";
import { Input } from "../../../../../components/Input/Input";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { InputSlider } from "../../../../../components/InputSlider/InputSlider";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

export type TypeEventFilters = {
  maxDistance: number;
  minPrice: number | null;
  maxPrice: number | null;
};

type ModalFilterProps = {
  filters: TypeEventFilters | null;
  onClose: () => void;
  onSubmit: (filters: TypeEventFilters) => void;
  maxDistance?: number;
};

const parseNumber = (value: string): number | null => {
  const normalized = value.replace(",", ".").trim();
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  onClose,
  onSubmit,
  filters,
  maxDistance = 200,
}) => {
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const [editUserMutation] = useEditUserMutation();
  const { location } = useMapProvider();

  const [distance, setDistance] = useState(5);
  const [minPriceText, setMinPriceText] = useState("");
  const [maxPriceText, setMaxPriceText] = useState("");

  const minPrice = useMemo(() => parseNumber(minPriceText), [minPriceText]);
  const maxPrice = useMemo(() => parseNumber(maxPriceText), [maxPriceText]);

  const isLocationEnabled = userData?.isGeoLocation || false;
  const isLocationLoading = isLocationEnabled && !location;

  const onToggleLocation = async () => {
    if (!userData) return;
    const isGeoLocation = !(userData.isGeoLocation || false);
    await editUserMutation({
      body: { isGeoLocation },
      existingUserData: userData,
    });
  };

  const onSubmitFilters = () => {
    const newFilters: TypeEventFilters = {
      maxDistance: distance,
      minPrice,
      maxPrice,
    };
    onSubmit(newFilters);
  };

  const hasFiltersChanged = useMemo(() => {
    const current: TypeEventFilters = {
      maxDistance: distance,
      minPrice,
      maxPrice,
    };

    if (!filters) {
      const hasAnyFilter =
        current.maxDistance !== 5 ||
        current.minPrice !== null ||
        current.maxPrice !== null;
      return hasAnyFilter;
    }

    const distanceChanged = filters.maxDistance !== current.maxDistance;
    const minPriceChanged = filters.minPrice !== current.minPrice;
    const maxPriceChanged = filters.maxPrice !== current.maxPrice;

    return distanceChanged || minPriceChanged || maxPriceChanged;
  }, [filters, distance, minPrice, maxPrice]);

  useEffect(() => {
    if (filters) {
      setDistance(filters.maxDistance);
      setMinPriceText(
        filters.minPrice !== null ? String(filters.minPrice) : ""
      );
      setMaxPriceText(
        filters.maxPrice !== null ? String(filters.maxPrice) : ""
      );
    } else {
      setDistance(maxDistance);
      setMinPriceText("");
      setMaxPriceText("");
    }
  }, [filters, maxDistance]);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Filter")}
        onPressLeftElement={onClose}
        backgroundStyle={styles.headerBackground}
        rightStyle={styles.containerRightHeader}
      />
      <View style={styles.containerBody}>
        <View style={styles.distanceContainer}>
          <InputSlider
            label={i18n._("Distance, km:")}
            min={0}
            max={maxDistance}
            value={distance}
            onChange={setDistance}
            disabled={!isLocationEnabled || isLocationLoading}
          />
          {isLocationLoading && (
            <BlurView intensity={5} style={styles.distanceBlur}>
              <View style={styles.distanceBlurContent}>
                <ActivityIndicator size="large" color={colors.blazeOrange} />
                <Text style={styles.distanceWarningText}>
                  {i18n._("Getting location...")}
                </Text>
              </View>
            </BlurView>
          )}
          {!isLocationEnabled && !isLocationLoading && (
            <BlurView intensity={5} style={styles.distanceBlur}>
              <View style={styles.distanceBlurContent}>
                <Text style={styles.distanceWarningText}>
                  {i18n._(
                    "To calculate distance, please enable location services"
                  )}
                </Text>
                <ButtonCustom
                  title={i18n._("Enable location")}
                  onSubmit={onToggleLocation}
                  styleContainer={styles.distanceButtonContainer}
                  styleButton={styles.distanceButton}
                />
              </View>
            </BlurView>
          )}
        </View>

        <Text style={styles.label}>{i18n._("Price range:")}</Text>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Input
              placeholder={i18n._("From")}
              value={minPriceText}
              onChange={setMinPriceText}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.flex}>
            <Input
              placeholder={i18n._("To")}
              value={maxPriceText}
              onChange={setMaxPriceText}
              keyboardType="numeric"
            />
          </View>
        </View>

        <ButtonCustom
          title={i18n._("Filtering")}
          onSubmit={onSubmitFilters}
          styleContainer={styles.buttonSubmit}
          disabled={!hasFiltersChanged}
        />
      </View>
    </View>
  );
};
