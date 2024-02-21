import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

// types
import { PlacesAllType } from "../../providers/MarketProvider/MarketProvider.types";
import {
  FilterCheckboxes,
  StepModalCheckboxes,
} from "./ModalSheetPlaceCheckboxes.types";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { placesContext } from "../../providers/PlacesProvider/PlacesProvider";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { Input } from "../Input/Input";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxClassic } from "../CheckboxClassic/CheckboxClassic";

// icons
import { IconSearchInput } from "../../icons/components";

// styles
import { styles } from "./ModalSheetPlaceCheckboxes.styles";

type ModalSheetPlaceProps = {
  placesSelected: PlacesAllType | null;
  isOpen: boolean;
  title: string;
  onClose: (isClear?: boolean) => void;
  onSubmit: (date: FilterCheckboxes) => void;
};

const STEPS: StepModalCheckboxes[] = ["country", "region", "city"];

export const ModalSheetPlaceCheckboxes: FunctionComponent<
  ModalSheetPlaceProps
> = ({ placesSelected, isOpen, title, onClose, onSubmit }) => {
  const { i18n, language } = useContext(localesContext);
  const { places } = useContext(placesContext);
  const [selectCountriesIso, setSelectCountriesIso] = useState<string[]>([]);
  const [selectRegionIds, setSelectRegionIds] = useState<string[]>([]);
  const [selectCitiesTitles, setSelectCitiesTitles] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(0);
  const showCountry = useMemo(
    () =>
      placesSelected && places
        ? Object.values(placesSelected).map((countryMini) => {
            const countryFull = Object.values(places).find(
              (country) => country.id.toString() === countryMini.countryId
            );
            const regions = countryFull
              ? Object.values(countryMini.regions).map((region) => {
                  const regionFull =
                    countryFull.regions.find(
                      (regionFull) => regionFull.placeId === region.regionId
                    ) || null;
                  return {
                    regionId: region.regionId,
                    title: regionFull?.name || { en: "", uk: "" },
                    cities: region.cities,
                  };
                })
              : [];
            return {
              title: countryFull?.title || "",
              countryId: countryMini.countryId,
              regions,
              isShow: countryFull?.isShow || false,
            };
          })
        : [],
    [places, placesSelected]
  );
  const countriesSelectAmount = useMemo(
    () =>
      placesSelected
        ? Object.values(placesSelected).filter((country) =>
            selectCountriesIso.includes(country.countryId)
          ).length
        : 0,
    [placesSelected, selectCountriesIso]
  );
  const amountData = useMemo(
    () =>
      placesSelected
        ? Object.values(placesSelected).reduce(
            (a, b) => {
              const regionsSelectAmount = Object.keys(b.regions).filter(
                (regionId) => selectRegionIds.includes(regionId)
              ).length;
              const citiesSelectAmount = Object.values(b.regions).reduce(
                (c, d) => {
                  const amountCities = d.cities.filter((cityName) =>
                    selectCitiesTitles.includes(cityName)
                  ).length;
                  return c + amountCities;
                },
                0
              );
              return {
                ...a,
                regions: a.regions + regionsSelectAmount,
                cities: a.cities + citiesSelectAmount,
              };
            },
            {
              countries: countriesSelectAmount,
              regions: 0,
              cities: 0,
            }
          )
        : {
            countries: countriesSelectAmount,
            regions: 0,
            cities: 0,
          },
    [placesSelected, countriesSelectAmount, selectRegionIds, selectCitiesTitles]
  );
  const stepName = useMemo(() => STEPS[step], [step]);

  const showElement = useMemo(() => {
    if (stepName === "country")
      return (
        <ScrollView style={styles.containerList}>
          {showCountry.map((country) => {
            const isFind = search.length
              ? country.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : true;
            const isShow = country?.isShow && isFind;
            return isShow ? (
              <TouchableOpacity
                key={`country-${country.countryId}`}
                style={styles.containerItemList}
                onPress={() => {
                  setSelectRegionIds([]);
                  setSelectCitiesTitles([]);
                  setSelectCountriesIso((state) =>
                    state.includes(country.countryId)
                      ? state.filter(
                          (countryIsoList) =>
                            countryIsoList !== country.countryId
                        )
                      : [...state, country.countryId]
                  );
                }}
              >
                <Text style={styles.titleItemList}>{country.title}</Text>
                <CheckboxClassic
                  isGradient
                  check={selectCountriesIso.includes(country.countryId)}
                  setCheck={() => {
                    setSelectRegionIds([]);
                    setSelectCitiesTitles([]);
                    setSelectCountriesIso((state) =>
                      state.includes(country.countryId)
                        ? state.filter(
                            (countryIsoList) =>
                              countryIsoList !== country.countryId
                          )
                        : [...state, country.countryId]
                    );
                  }}
                />
              </TouchableOpacity>
            ) : null;
          })}
        </ScrollView>
      );
    if (stepName === "region") {
      return (
        <ScrollView style={styles.containerList}>
          {showCountry.map((country) => {
            const isFindCountry = selectCountriesIso.includes(
              country.countryId
            );

            return isFindCountry ? (
              <View key={`country-${country.countryId}`}>
                <Text style={styles.titleCountryRegions}>{country.title}</Text>
                <View>
                  {country.regions.map((region) => {
                    const isFind = search.length
                      ? Object.values(region.title).filter((name) =>
                          name
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase())
                        ).length > 0
                      : true;

                    return isFind ? (
                      <TouchableOpacity
                        key={`country-${country.countryId}-region-${region.regionId}`}
                        style={styles.containerItemList}
                        onPress={() => {
                          setSelectCitiesTitles([]);
                          setSelectRegionIds((state) =>
                            state.includes(region.regionId)
                              ? state.filter(
                                  (regionId) => regionId !== region.regionId
                                )
                              : [...state, region.regionId]
                          );
                        }}
                      >
                        <Text style={styles.titleItemList}>
                          {region.title[language || "en"]}
                        </Text>
                        <CheckboxClassic
                          isGradient
                          check={selectRegionIds.includes(region.regionId)}
                          setCheck={() => {
                            setSelectCitiesTitles([]);
                            setSelectRegionIds((state) =>
                              state.includes(region.regionId)
                                ? state.filter(
                                    (regionId) => regionId !== region.regionId
                                  )
                                : [...state, region.regionId]
                            );
                          }}
                        />
                      </TouchableOpacity>
                    ) : null;
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
          {showCountry.map((country) => {
            const isFindCountry = selectCountriesIso.includes(
              country.countryId
            );
            const isFindRegion =
              Object.values(country.regions).filter((region) =>
                selectRegionIds.includes(region.regionId)
              ).length > 0;

            return isFindCountry && isFindRegion ? (
              <View key={`country-${country.countryId}`}>
                <Text style={styles.selectTitleCountryRegions}>
                  {country.title}
                </Text>
                <View>
                  {country.regions.map((region) => {
                    const isFindRegion = selectRegionIds.includes(
                      region.regionId
                    );

                    return isFindRegion ? (
                      <View
                        key={`country-${country.countryId}-region-${region.regionId}`}
                      >
                        <Text style={styles.titleCountryRegions}>
                          {region.title[language || "en"]}
                        </Text>
                        <View>
                          {region.cities.map((cityName, index) => {
                            const isFind = search.length
                              ? cityName
                                  .toLocaleLowerCase()
                                  .includes(search.toLocaleLowerCase())
                              : true;

                            return isFind ? (
                              <TouchableOpacity
                                key={`country-${country.countryId}-region-${
                                  region.regionId
                                }-city-${index + 1}`}
                                style={styles.containerItemList}
                                onPress={() => {
                                  setSelectCitiesTitles((state) =>
                                    state.includes(cityName)
                                      ? state.filter(
                                          (regionId) => regionId !== cityName
                                        )
                                      : [...state, cityName]
                                  );
                                }}
                              >
                                <Text style={styles.titleItemList}>
                                  {cityName}
                                </Text>
                                <CheckboxClassic
                                  isGradient
                                  check={selectCitiesTitles.includes(cityName)}
                                  setCheck={() => {
                                    setSelectCitiesTitles((state) =>
                                      state.includes(cityName)
                                        ? state.filter(
                                            (cityNameState) =>
                                              cityNameState !== cityName
                                          )
                                        : [...state, cityName]
                                    );
                                  }}
                                />
                              </TouchableOpacity>
                            ) : null;
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
  }, [selectCountriesIso, selectRegionIds, selectCitiesTitles, step, search]);

  const isSelectStep = useMemo(() => {
    if (stepName === "country") return amountData.countries > 0;
    if (stepName === "region") return amountData.regions > 0;
    if (stepName === "city") return amountData.cities > 0;
    return true;
  }, [stepName, amountData]);

  const onPressBack = () => {
    setSearch("");
    if (step === 0) onClose();
    else setStep((state) => state - 1);
  };

  const onPressNext = () => {
    setSearch("");
    if (step === 0 && amountData.countries === 0) onClose(true);
    else if (isSelectStep && STEPS.length - 1 > step) {
      setStep((state) => state + 1);
    } else {
      const submitData = {
        countryIds: selectCountriesIso,
        regionIds: selectRegionIds,
        cityTitles: selectCitiesTitles,
      };
      onSubmit(submitData);
      onClose();
    }
  };

  useEffect(() => {
    setStep(0);
  }, [isOpen]);

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
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
            <Shadow stretch disabled={step > 1}>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  title={!isSelectStep ? i18n._("Select") : i18n._("Continue")}
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
