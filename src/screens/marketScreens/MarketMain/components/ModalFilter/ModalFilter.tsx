import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal, StatusBar, Text, View } from "react-native";
import { Trans } from "@lingui/macro";

// types
import { CurrencyType } from "../../../../../providers/PaymentProvider/PaymentProvider.types";
import {
  CountryType,
  RegionsCountryType,
} from "../../../../../providers/PlacesProvider/PlacesProvider.types";

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

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  isOpen,
  onClose,
}) => {
  const { i18n, language } = useContext(localesContext);
  const { listCurrency } = useContext(paymentContext);
  const { minMaxPrices, placesAll } = useContext(marketContext);
  const { places } = useContext(placesContext);
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
  const selectCountries = useMemo(
    () =>
      selectPlaces?.countryIds.reduce((a, b) => {
        const country = places
          ? Object.values(places).find(
              (countryOld) => countryOld.id.toString() === b
            )
          : null;
        if (!country) return a;
        return [...a, country];
      }, [] as CountryType[]) || null,
    [selectPlaces?.countryIds]
  );
  const selectRegions = useMemo(
    () =>
      selectCountries?.reduce((a, b) => {
        const regions =
          b.regions.filter(
            (region) => selectPlaces?.regionIds.includes(region.placeId)
          ) || [];
        return [...a, ...regions];
      }, [] as RegionsCountryType) || null,
    [selectCountries, selectPlaces?.regionIds]
  );
  const showTitle = useMemo(() => {
    if (selectPlaces?.cityTitles.length)
      return selectPlaces.cityTitles.join("/");
    if (selectRegions?.length)
      return selectRegions
        .map((region) => region.name[language || "en"])
        .join("/");
    if (selectCountries?.length)
      return selectCountries.map((country) => country.title).join("/");
    return "";
  }, [selectPlaces?.cityTitles, selectRegions, selectCountries]);
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
    };
    console.log("dataFilter", dataFilter);
  };

  useEffect(() => {
    if (minSlider > price || maxSlider < price) setPrice(minSlider);
  }, [selectCurrency]);

  return (
    <Modal transparent visible={isOpen}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.lightOrange} />
        <Header
          title={i18n._("Filter")}
          onPressLeftElement={onClose}
          backgroundStyle={styles.headerBackground}
          rightStyle={styles.containerRightHeader}
        />
        <View style={styles.containerInputs}>
          <InputButton
            isSelect
            placeholder={i18n._("Category")}
            value={i18n._("Category")}
            onPress={() => {}}
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
            value={showTitle}
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
          <ButtonCustom
            title={i18n._("Filtering")}
            onSubmit={onSubmitFilters}
            styleContainer={styles.buttonSubmit}
          />
        </View>
      </View>
      <ModalSheetPlaceCheckboxes
        isOpen={isShowPlaces}
        title={i18n._("Location")}
        onClose={(isClear) => {
          if (isClear) setSelectPlaces(null);
          setIsShowPlaces(false);
        }}
        onSubmit={setSelectPlaces}
        placesSelected={placesAll}
      />
    </Modal>
  );
};
