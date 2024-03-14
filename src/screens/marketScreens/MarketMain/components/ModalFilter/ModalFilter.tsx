import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, ScrollView, StatusBar, Text, View } from "react-native";
import { Trans } from "@lingui/macro";
import { Shadow } from "react-native-shadow-2";

// types
import { CurrencyType } from "../../../../../providers/PaymentProvider/PaymentProvider.types";
import {
  CountryType,
  RegionsCountryType,
} from "../../../../../providers/PlacesProvider/PlacesProvider.types";
import {
  TypeDataCategory,
  TypeModalCategories,
} from "../../../MarketAdd/MarketAdd.types";
import { ModalFilterSubmitType } from "./ModalFilter.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { paymentContext } from "../../../../../providers/PaymentProvider/PaymentProvider";
import { marketContext } from "../../../../../providers/MarketProvider/MarketProvider";
import { placesContext } from "../../../../../providers/PlacesProvider/PlacesProvider";

// components
import { Header } from "../../../../../components/Header/Header";
import { InputButton } from "../../../../../components/InputButton/InputButton";
import { SelectTwoButtons } from "../../../../../components/SelectTwoButtons/SelectTwoButtons";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { InputSlider } from "../../../../../components/InputSlider/InputSlider";
import { FilterCheckboxes } from "../../../../../components/ModalSheetPlaceCheckboxes/ModalSheetPlaceCheckboxes.types";
import { ModalSheetPlaceCheckboxes } from "../../../../../components/ModalSheetPlaceCheckboxes/ModalSheetPlaceCheckboxes";
import { ModalSheetCategories } from "../../../MarketAdd/components/ModalSheetCategories/ModalSheetCategories";

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// constants
import {
  NAME_BRAND_AUTO,
  NAME_BRAND_MOTO,
  NAME_MAIN_CATEGORIES,
} from "../../../MarketAdd/MarketAdd.constants";
import { DEFAULT_NAME_TYPE_LOCALITY } from "../../../../../providers/PlacesProvider/PlacesProvider.constants";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
  dataFilterOld: ModalFilterSubmitType | null;
  onSubmit: (dataFilter: ModalFilterSubmitType | null) => void;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  isOpen,
  onClose,
  dataFilterOld,
  onSubmit,
}) => {
  const { i18n, language } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const { minMaxPrices } = useContext(marketContext);
  const { placesFindDB, regionsDB, countriesDB } = useContext(placesContext);
  const [selectCurrency, setSelectCurrency] = useState<CurrencyType | null>(
    null
  );
  const [price, setPrice] = useState(200);
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [isBusiness, setIsBusiness] = useState<boolean | null>(null);
  const [isShowPlaces, setIsShowPlaces] = useState(false);
  const [selectPlaces, setSelectPlaces] = useState<FilterCheckboxes | null>(
    null
  );
  const [typeModal, setTypeModal] = useState<TypeModalCategories | null>(null);
  const [multiselect, setMultiselect] = useState<Record<
    TypeModalCategories,
    TypeDataCategory[] | undefined
  > | null>(null);
  const isMoto = useMemo(
    () =>
      multiselect?.category
        ? multiselect.category.filter((item) => item.id === 1).length > 0
        : false,
    [multiselect?.category]
  );
  const isCar = useMemo(
    () =>
      multiselect?.category
        ? multiselect.category.filter((item) => item.id === 2).length > 0
        : false,
    [multiselect?.category]
  );
  const isMotoParts = useMemo(
    () =>
      multiselect?.category
        ? multiselect.category.filter((item) => item.id === 3).length > 0
        : false,
    [multiselect?.category]
  );
  const isCarParts = useMemo(
    () =>
      multiselect?.category
        ? multiselect.category.filter((item) => item.id === 4).length > 0
        : false,
    [multiselect?.category]
  );
  const showTitleCategories = useMemo(() => {
    const category = multiselect?.category
      ? multiselect?.category.map((item) => item.name).join("/")
      : "";
    const brandMoto = multiselect?.brandMoto
      ? multiselect?.brandMoto.map((item) => item.name).join("/")
      : "";
    const brandAuto = multiselect?.brandAuto
      ? multiselect?.brandAuto.map((item) => item.name).join("/")
      : "";
    return { category, brandMoto, brandAuto };
  }, [multiselect]);
  const showTitleLocation = useMemo(() => {
    if (selectPlaces?.cityPlaceIds && selectPlaces.cityPlaceIds.length > 0)
      return placesFindDB
        .filter((place) => selectPlaces.cityPlaceIds.includes(place.place_id))
        .map(
          (place) =>
            place[language].address_components.find((addressComponent) =>
              addressComponent.types.includes(DEFAULT_NAME_TYPE_LOCALITY)
            )?.long_name || ""
        )
        .join("/");
    if (selectPlaces?.regionPlaceIds && selectPlaces.regionPlaceIds.length > 0)
      return regionsDB
        .filter((region) =>
          selectPlaces.regionPlaceIds.includes(region.place_id)
        )
        .map((region) => region[language].long_name)
        .join("/");
    if (
      selectPlaces?.countryPlaceIds &&
      selectPlaces.countryPlaceIds.length > 0
    )
      return countriesDB
        .filter((country) =>
          selectPlaces.countryPlaceIds.includes(country.place_id)
        )
        .map((country) => country[language].long_name)
        .join("/");
    return "";
  }, [selectPlaces]);
  const minSlider = useMemo(
    () =>
      minMaxPrices?.min && selectCurrency
        ? Number(minMaxPrices.min[selectCurrency.code].toFixed(0))
        : 0,
    [minMaxPrices?.min, selectCurrency]
  );
  const maxSlider = useMemo(
    () =>
      minMaxPrices?.max && selectCurrency
        ? Number(minMaxPrices.max[selectCurrency.code].toFixed(0))
        : 5000,
    [minMaxPrices?.max, selectCurrency]
  );
  const onSubmitFilters = () => {
    const dataFilter = {
      price: selectCurrency
        ? {
            codeCurrent: selectCurrency.code,
            min: minSlider,
            max: price,
          }
        : null,
      isNew,
      isBusiness,
      ...multiselect,
      selectPlaces,
    };
    onSubmit(dataFilter);
    onClose();
  };

  useEffect(() => {
    if (minSlider > price || maxSlider < price) setPrice(minSlider);
  }, [selectCurrency]);

  useEffect(() => {
    if (dataFilterOld) {
      const multiselectOld: Record<string, TypeDataCategory[] | undefined> = {
        category: dataFilterOld.category,
        brandAuto: dataFilterOld.brandAuto,
        brandMoto: dataFilterOld.brandMoto,
      };
      setIsBusiness(dataFilterOld.isBusiness);
      setIsNew(dataFilterOld.isNew);
      setMultiselect(multiselectOld);
      if (dataFilterOld.price) {
        const currencyOld =
          listCurrency.find(
            (currency) => currency.code === dataFilterOld.price?.codeCurrent
          ) || null;

        setPrice(dataFilterOld.price.max);
        setSelectCurrency(currencyOld);
      }
      setSelectPlaces(dataFilterOld.selectPlaces);
    }
  }, [dataFilterOld]);

  return (
    <Modal transparent visible={isOpen}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.lightOrange} />
        <Shadow stretch>
          <Header
            title={i18n._("Filter")}
            onPressLeftElement={onClose}
            backgroundStyle={styles.headerBackground}
            rightStyle={styles.containerRightHeader}
          />
        </Shadow>
        <ScrollView>
          <View style={styles.containerInputs}>
            <InputButton
              isSelect
              placeholder={i18n._("Category")}
              value={showTitleCategories.category || i18n._("Category")}
              onPress={() => {
                setTypeModal(NAME_MAIN_CATEGORIES);
              }}
              rightElementInput={
                <IconArrowRightEvent
                  width={15}
                  height={15}
                  fill={colors.blackCoffee}
                />
              }
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
            />
            <InputButton
              isSelect
              label={i18n._("Location")}
              placeholder={i18n._("Choose a city")}
              value={showTitleLocation}
              onPress={() => {
                setIsShowPlaces(true);
              }}
              rightElementInput={
                <IconArrowRightEvent
                  width={15}
                  height={15}
                  fill={colors.blackCoffee}
                />
              }
              containerStyle={styles.containerStyleInputButton}
              inputWrapperStyle={styles.inputWrapperStyleInputButton}
            />
            <SelectTwoButtons
              isSelectFirst={isNew}
              titleFirst={i18n._("New")}
              titleSecond={i18n._("Used")}
              label={i18n._("The state of the goods:")}
              onPressFirst={() => {
                setIsNew((state) => (state ? null : true));
              }}
              onPressSecond={() => {
                setIsNew((state) => (state === false ? null : false));
              }}
              containerStyle={styles.containerTwoButtons}
              labelStyle={styles.labelSelect}
            />
            <SelectTwoButtons
              isSelectFirst={isBusiness}
              titleFirst={i18n._("Business")}
              titleSecond={i18n._("Private individual")}
              label={i18n._("Seller:")}
              onPressFirst={() => {
                setIsBusiness((state) => (state ? null : true));
              }}
              onPressSecond={() => {
                setIsBusiness((state) => (state === false ? null : false));
              }}
              containerStyle={styles.containerTwoButtons}
              labelStyle={styles.labelSelect}
            />
            <View style={styles.containerCurrencies}>
              <Text style={styles.labelOther}>
                <Trans>Currency:</Trans>
              </Text>
              <View style={styles.listCurrencies}>
                {listCurrency.map((currency) => (
                  <ButtonCustom
                    key={`currency=${currency.code}`}
                    disabledShadow
                    title={currency.symbol}
                    type={
                      selectCurrency?.code === currency.code
                        ? "full"
                        : "transparent"
                    }
                    onSubmit={() => {
                      setSelectCurrency((state) =>
                        state?.code === currency.code ? null : currency
                      );
                    }}
                    styleContainer={styles.containerButtonCurrency}
                    styleTitle={styles.titleButtonCurrency}
                  />
                ))}
              </View>
            </View>
            <InputSlider
              disabled={selectCurrency === null}
              label={i18n._("Price, {symbol}:", {
                symbol: selectCurrency?.symbol || listCurrency[0].symbol,
              })}
              min={minSlider}
              max={maxSlider}
              value={price}
              onChange={setPrice}
            />
            {isCar || isCarParts ? (
              <InputButton
                placeholder={i18n._("Make of car")}
                value={showTitleCategories.brandAuto || i18n._("Make of car")}
                onPress={() => {
                  setTypeModal(NAME_BRAND_AUTO);
                }}
                rightElementInput={
                  <IconArrowRightEvent
                    width={15}
                    height={15}
                    fill={colors.blackCoffee}
                  />
                }
                containerStyle={styles.containerStyleInputButton}
                inputWrapperStyle={styles.inputWrapperStyleInputButton}
              />
            ) : null}
            {isMoto || isMotoParts ? (
              <InputButton
                placeholder={i18n._("brand of motorcycle")}
                value={
                  showTitleCategories.brandMoto || i18n._("Brand of motorcycle")
                }
                onPress={() => {
                  if (isMoto || isMotoParts) setTypeModal(NAME_BRAND_MOTO);
                }}
                rightElementInput={
                  <IconArrowRightEvent
                    width={15}
                    height={15}
                    fill={colors.blackCoffee}
                  />
                }
                containerStyle={styles.containerStyleInputButton}
                inputWrapperStyle={styles.inputWrapperStyleInputButton}
              />
            ) : null}
            <ButtonCustom
              title={i18n._("Filtering")}
              onSubmit={onSubmitFilters}
              styleContainer={styles.buttonSubmit}
            />
          </View>
          <View style={styles.containerEmpty} />
        </ScrollView>
      </View>
      <ModalSheetPlaceCheckboxes
        isOpen={isShowPlaces}
        title={i18n._("Location")}
        onClose={(isClear) => {
          if (isClear) setSelectPlaces(null);
          setIsShowPlaces(false);
        }}
        onSubmit={(value) => {
          setSelectPlaces(value);
        }}
      />
      <ModalSheetCategories
        isMultiSelect
        type={typeModal}
        multiselectData={multiselect}
        onClose={() => {
          setTypeModal(null);
        }}
        onSubmitMultiselect={(type, selectData) => {
          const newMultiselectList: Record<
            string,
            TypeDataCategory[] | undefined
          > = multiselect
            ? { ...multiselect, [type]: selectData }
            : { [type]: selectData };
          setMultiselect(newMultiselectList);
        }}
      />
    </Modal>
  );
};
