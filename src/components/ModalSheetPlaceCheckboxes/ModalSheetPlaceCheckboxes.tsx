import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import {
  FilterCheckboxes,
  StepModalCheckboxes,
} from "./ModalSheetPlaceCheckboxes.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { usePlacesProvider } from "../../providers/PlacesProvider/PlacesProvider";

// components
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { Input } from "../Input/Input";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";

// constants
import { languagesKeys } from "../../../localization/localization.const";
import { DEFAULT_NAME_TYPE_LOCALITY } from "../../providers/PlacesProvider/PlacesProvider.constants";

// icons
import { IconSearchInput } from "../../icons/components";

// styles
import { styles } from "./ModalSheetPlaceCheckboxes.styles";

type ModalSheetPlaceProps = {
  isOpen: boolean;
  title: string;
  onClose: (isClear?: boolean) => void;
  onSubmit: (date: FilterCheckboxes) => void;
};

const STEPS: StepModalCheckboxes[] = ["country", "region", "city"];

export const ModalSheetPlaceCheckboxes: FunctionComponent<
  ModalSheetPlaceProps
> = ({ isOpen, title, onClose, onSubmit }) => {
  const { i18n, language } = useLocalesProvider();
  const { countriesDB, regionsDB, placesFindDB, getRegions, getPlaces } =
    usePlacesProvider();
  const [selectCountriesPlaceIds, setSelectCountriesPlaceIds] = useState<
    string[]
  >([]);
  const [selectRegionsPlaceIds, setSelectRegionPlaceIds] = useState<string[]>(
    []
  );
  const [selectCitiesPlaceIds, setSelectCitiesPlaceIds] = useState<string[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(0);
  const stepName = useMemo(() => STEPS[step], [step]);

  const showElement = useMemo(() => {
    if (stepName === "country")
      return (
        <ScrollView style={styles.containerList}>
          {countriesDB.map((country) => {
            const countryTranslate = country[language];
            const isFindSearchCountry = search.length
              ? languagesKeys.filter((languageKey) =>
                  country[languageKey].long_name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ).length > 0
              : true;
            if (!isFindSearchCountry) return null;
            return (
              <TouchableOpacity
                key={`country-${country.place_id}`}
                accessibilityLabel={i18n._("Select country {nameCountry}", {
                  nameCountry: countryTranslate.long_name,
                })}
                style={styles.containerItemList}
                onPress={() => {
                  setSelectCitiesPlaceIds([]);
                  setSelectRegionPlaceIds([]);
                  setSelectCountriesPlaceIds((state) =>
                    state.includes(country.place_id)
                      ? state.filter(
                          (countryIsoList) =>
                            countryIsoList !== country.place_id
                        )
                      : [...state, country.place_id]
                  );
                }}
              >
                <Text style={styles.titleItemList}>
                  {countryTranslate.long_name}
                </Text>
                <CheckboxClassic
                  isGradient
                  accessibilityLabel={i18n._("Select country {nameCountry}", {
                    nameCountry: countryTranslate.long_name,
                  })}
                  check={selectCountriesPlaceIds.includes(country.place_id)}
                  setCheck={() => {
                    setSelectCitiesPlaceIds([]);
                    setSelectRegionPlaceIds([]);
                    setSelectCountriesPlaceIds((state) =>
                      state.includes(country.place_id)
                        ? state.filter(
                            (countryIsoList) =>
                              countryIsoList !== country.place_id
                          )
                        : [...state, country.place_id]
                    );
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      );
    if (stepName === "region") {
      return (
        <ScrollView style={styles.containerList}>
          {countriesDB.map((country) => {
            const isFindCountry = selectCountriesPlaceIds.includes(
              country.place_id
            );
            const countryTranslate = country[language];
            const regionsCountry = regionsDB.filter(
              (region) => region.country_place_id === country.place_id
            );
            return isFindCountry ? (
              <View key={`country-${country.place_id}`}>
                <Text style={styles.titleCountryRegions}>
                  {countryTranslate.long_name}
                </Text>
                <View>
                  {regionsCountry.map((region) => {
                    const regionTranslate = region[language];
                    const isFindSearchRegion = search.length
                      ? languagesKeys.filter((languageKey) =>
                          region[languageKey].long_name
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase())
                        ).length > 0
                      : true;
                    if (!isFindSearchRegion) return null;
                    return (
                      <TouchableOpacity
                        key={`country-${country.place_id}-region-${region.place_id}`}
                        accessibilityLabel={i18n._(
                          "Select region {nameRegion}",
                          { nameRegion: regionTranslate.long_name }
                        )}
                        style={styles.containerItemList}
                        onPress={() => {
                          setSelectCitiesPlaceIds([]);
                          setSelectRegionPlaceIds((state) =>
                            state.includes(region.place_id)
                              ? state.filter(
                                  (regionId) => regionId !== region.place_id
                                )
                              : [...state, region.place_id]
                          );
                        }}
                      >
                        <Text style={styles.titleItemList}>
                          {regionTranslate.long_name}
                        </Text>
                        <CheckboxClassic
                          isGradient
                          accessibilityLabel={i18n._(
                            "Select region {nameRegion}",
                            { nameRegion: regionTranslate.long_name }
                          )}
                          check={selectRegionsPlaceIds.includes(
                            region.place_id
                          )}
                          setCheck={() => {
                            setSelectCitiesPlaceIds([]);
                            setSelectRegionPlaceIds((state) =>
                              state.includes(region.place_id)
                                ? state.filter(
                                    (regionId) => regionId !== region.place_id
                                  )
                                : [...state, region.place_id]
                            );
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null;
          })}
          <View style={styles.containerEmpty} />
        </ScrollView>
      );
    }
    if (stepName === "city")
      return (
        <ScrollView style={styles.containerList}>
          {countriesDB.map((country) => {
            const isFindCountry = selectCountriesPlaceIds.includes(
              country.place_id
            );
            const countryTranslate = country[language];
            const regionsCountry = regionsDB.filter(
              (region) => region.country_place_id === country.place_id
            );

            return isFindCountry ? (
              <View key={`country-${country.place_id}`}>
                <Text style={styles.selectTitleCountryRegions}>
                  {countryTranslate.long_name}
                </Text>
                <View>
                  {regionsCountry.map((region) => {
                    const regionTranslate = region[language];
                    const isFindRegion = selectRegionsPlaceIds.includes(
                      region.place_id
                    );
                    const placesRegionCountry = placesFindDB.filter(
                      (place) => region.place_id === place.region_place_id
                    );

                    return isFindRegion ? (
                      <View
                        key={`country-${country.place_id}-region-${region.place_id}`}
                      >
                        <Text style={styles.titleCountryRegions}>
                          {regionTranslate.long_name}
                        </Text>
                        <View>
                          {placesRegionCountry.map((place) => {
                            const placeTranslate = place[language];
                            const isFindSearchPlace = search.length
                              ? languagesKeys.filter(
                                  (languageKey) =>
                                    place[
                                      languageKey
                                    ].address_components.filter(
                                      (addressComponent) =>
                                        addressComponent.types.includes(
                                          DEFAULT_NAME_TYPE_LOCALITY
                                        ) &&
                                        addressComponent.long_name
                                          .toLocaleLowerCase()
                                          .includes(search.toLocaleLowerCase())
                                    ).length > 0
                                ).length > 0
                              : true;
                            if (!isFindSearchPlace) return null;
                            return (
                              <TouchableOpacity
                                key={`country-${country.place_id}-region-${region.place_id}-place-${place.place_id}`}
                                accessibilityLabel={i18n._(
                                  "Select region {nameCity}",
                                  { nameCity: placeTranslate.formatted_address }
                                )}
                                style={styles.containerItemList}
                                onPress={() => {
                                  setSelectCitiesPlaceIds((state) =>
                                    state.includes(place.place_id)
                                      ? state.filter(
                                          (placeId) =>
                                            placeId !== place.place_id
                                        )
                                      : [...state, place.place_id]
                                  );
                                }}
                              >
                                <Text
                                  numberOfLines={1}
                                  style={styles.titleItemList}
                                >
                                  {placeTranslate.formatted_address}
                                </Text>
                                <CheckboxClassic
                                  isGradient
                                  accessibilityLabel={i18n._(
                                    "Select region {nameCity}",
                                    {
                                      nameCity:
                                        placeTranslate.formatted_address,
                                    }
                                  )}
                                  check={selectCitiesPlaceIds.includes(
                                    place.place_id
                                  )}
                                  setCheck={() => {
                                    setSelectCitiesPlaceIds((state) =>
                                      state.includes(place.place_id)
                                        ? state.filter(
                                            (placeId) =>
                                              placeId !== place.place_id
                                          )
                                        : [...state, place.place_id]
                                    );
                                  }}
                                />
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    ) : null;
                  })}
                </View>
              </View>
            ) : null;
          })}
          <View style={styles.containerEmpty} />
        </ScrollView>
      );
    return null;
  }, [
    selectCountriesPlaceIds,
    selectRegionsPlaceIds,
    selectCitiesPlaceIds,
    countriesDB,
    regionsDB,
    placesFindDB,
    step,
    search,
  ]);

  const isSelectStep = useMemo(() => {
    if (stepName === "country") return selectCountriesPlaceIds.length > 0;
    if (stepName === "region") return selectRegionsPlaceIds.length > 0;
    if (stepName === "city") return selectCitiesPlaceIds.length > 0;
    return true;
  }, [
    stepName,
    selectCountriesPlaceIds,
    selectRegionsPlaceIds,
    selectCitiesPlaceIds,
  ]);

  const onPressBack = () => {
    setSearch("");
    if (step === 0) onClose();
    else setStep((state) => state - 1);
  };

  const onPressNext = () => {
    setSearch("");
    if (step === 0 && selectCountriesPlaceIds.length === 0) onClose(true);
    else if (step === 0 && selectCountriesPlaceIds.length > 0) {
      getRegions(selectCountriesPlaceIds);
      setStep((state) => state + 1);
    } else if (isSelectStep && STEPS.length - 1 > step) {
      setStep((state) => state + 1);
      getPlaces(selectCountriesPlaceIds, selectRegionsPlaceIds);
    } else {
      const submitData: FilterCheckboxes = {
        countryPlaceIds: selectCountriesPlaceIds,
        regionPlaceIds: selectRegionsPlaceIds,
        cityPlaceIds: selectCitiesPlaceIds,
      };
      onSubmit(submitData);
      onClose();
    }
  };

  useEffect(() => {
    setStep(0);
  }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => onClose()}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <View style={styles.container}>
            <Shadow stretch>
              <View style={styles.containerHeader}>
                <Text style={styles.title}>{title}</Text>
                <LinearGradientCustom style={styles.lineHeader} />
                <Input
                  isSelect
                  label={i18n._("Select country")}
                  placeholder={i18n._("Enter text to search")}
                  value={search}
                  onChange={setSearch}
                  InputIcon={<IconSearchInput width={26} height={26} />}
                  containerStyle={styles.inputSearch}
                />
              </View>
            </Shadow>
            {showElement}
            <View>
              <Shadow stretch>
                <View style={styles.containerSubmitModalTypeWork}>
                  <ButtonCustom
                    accessibilityLabel={
                      !isSelectStep ? i18n._("Select") : i18n._("Continue")
                    }
                    title={
                      !isSelectStep ? i18n._("Select") : i18n._("Continue")
                    }
                    onSubmit={onPressNext}
                  />
                  <ButtonCustom
                    type="transparent"
                    disabled={false}
                    accessibilityLabel={i18n._("Back")}
                    title={i18n._("Back")}
                    onSubmit={onPressBack}
                  />
                </View>
              </Shadow>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
