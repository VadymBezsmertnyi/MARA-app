import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { Trans } from "@lingui/macro";

// types
import { TypeFilters } from "./ModalFilter.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// hooks
import { useWorkshopsProvider } from "../../../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { Header } from "../../../../../components/Header/Header";
import { InputButton } from "../../../../../components/InputButton/InputButton";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";
import { ModalSheetTypeWorkshops } from "../../../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetTypesMotoWorks } from "../../../../../components/ModalSheetTypesMotoWorks/ModalSheetTypesMotoWorks";
import { ModalSheetTypesAutoWorks } from "../../../../../components/ModalSheetTypesAutoWorks/ModalSheetTypesAutoWorks";

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  filters: TypeFilters | null;
  onClose: () => void;
  onSubmit: (filters: TypeFilters) => void;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  onClose,
  onSubmit,
  filters,
}) => {
  const { i18n } = useContext(localesContext);
  const { typesWorkServices } = useWorkshopsProvider();
  const [distance, setDistance] = useState(5);
  const [isShowTypeWorkshops, setIsShowTypeWorkshops] = useState(false);
  const [isShowTypesMotoWorks, setIsShowTypesMotoWorks] = useState(false);
  const [isShowTypesAutoWorks, setIsShowTypesAutoWorks] = useState(false);
  const [selectMotoTypesWorks, setSelectMotoTypesWorks] = useState<number[]>(
    []
  );
  const [selectAutoTypesWorks, setSelectAutoTypesWorks] = useState<number[]>(
    []
  );
  const [typeWorkshops, setTypeWorkshops] = useState({
    moto: false,
    auto: false,
  });
  const [selectRating, setSelectRating] = useState<number | null>(null);

  const onSubmitFilters = () => {
    const filters = {
      moto: typeWorkshops.moto ? selectMotoTypesWorks : null,
      auto: typeWorkshops.auto ? selectAutoTypesWorks : null,
      maxDistance: distance,
      minRating: selectRating,
    };
    onSubmit(filters);
  };
  const valueTypesWork = useMemo(() => {
    const selectMotoTypes = selectMotoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.moto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const selectAutoTypes = selectAutoTypesWorks.map(
      (idTypeWork) =>
        typesWorkServices.auto.find((typeWork) => typeWork.id === idTypeWork)
          ?.title || i18n._("Not information")
    );
    const valueMoto = selectMotoTypes.length
      ? `${i18n._("Moto")}: ${selectMotoTypes.join("/")}`
      : "";
    const valueAuto = selectAutoTypes.length
      ? `${i18n._("Auto")}: ${selectAutoTypes.join("/")}`
      : "";

    if (valueMoto.length && valueAuto.length)
      return `${valueMoto}\n${valueAuto}`;
    if (valueMoto.length) return valueMoto;
    return valueAuto;
  }, [selectAutoTypesWorks, selectMotoTypesWorks]);

  const valueTypesWorkshops = useMemo(() => {
    if (typeWorkshops.auto && typeWorkshops.moto)
      return i18n._("All workshops");
    else if (typeWorkshops.moto) return i18n._("Repair of motorcycles");
    else if (typeWorkshops.auto) return i18n._("Repair of automobiles");
    return "";
  }, [typeWorkshops]);

  const ratings = useMemo(
    () => Array.from({ length: 5 }, (_, index) => index + 1),
    []
  );

  const onSelectRating = (rating: number) => {
    if (selectRating === rating) setSelectRating(null);
    else setSelectRating(rating);
  };

  const onSubmitTypeWorkshop = () => {
    if (!typeWorkshops.moto) setSelectMotoTypesWorks([]);
    if (!typeWorkshops.auto) setSelectAutoTypesWorks([]);
    setIsShowTypeWorkshops(false);
  };

  const onPressSelectTypesWork = () => {
    if (typeWorkshops.moto) setIsShowTypesMotoWorks(true);
    else if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitMotoTypeWorks = () => {
    setIsShowTypesMotoWorks(false);
    if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSubmitAutoTypeWorks = () => {
    setIsShowTypesAutoWorks(false);
  };

  useEffect(() => {
    if (filters) {
      if (filters.moto || filters.auto)
        setTypeWorkshops({
          moto: filters.moto ? filters.moto.length > 0 : false,
          auto: filters.auto ? filters.auto.length > 0 : false,
        });
      if (filters.moto) setSelectMotoTypesWorks(filters.moto);
      if (filters.auto) setSelectAutoTypesWorks(filters.auto);
      if (filters.maxDistance) setDistance(filters.maxDistance);
      if (filters.minRating) setSelectRating(filters.minRating);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Filter")}
        onPressLeftElement={onClose}
        backgroundStyle={styles.headerBackground}
      />
      <View style={styles.containerBody}>
        <InputButton
          isSelect
          value={valueTypesWorkshops}
          placeholder={i18n._("All workshops")}
          label={i18n._("Type workshops")}
          onPress={() => {
            setIsShowTypeWorkshops(true);
          }}
          containerStyle={styles.containerStyleInputButton}
          inputWrapperStyle={styles.inputWrapperStyleInputButton}
          rightElementInput={
            <IconArrowRightEvent
              width={15}
              height={20}
              fill={colors.blackCoffee}
            />
          }
        />
        <View style={styles.containerFullTrack}>
          <Text style={styles.labelSectors}>
            <Trans>Distance, km:</Trans>
          </Text>
          <View style={styles.containerTrack}>
            <View style={styles.track}>
              <TouchableOpacity
                style={styles.containerIcon}
                onPress={() => {
                  if (distance > 1) setDistance((state) => state - 1);
                }}
              >
                <View style={styles.lineMinusIcon} />
              </TouchableOpacity>
              <Slider
                value={distance}
                onValueChange={(values) => {
                  setDistance(Number(values[0].toFixed()));
                }}
                minimumValue={1}
                maximumValue={200}
                trackStyle={styles.trackStyle}
                renderThumbComponent={() => (
                  <View style={styles.containerThumb}>
                    <LinearGradientCustom
                      style={styles.thumbLinerGradientStyle}
                    >
                      <View style={styles.thumbStyle} />
                    </LinearGradientCustom>
                    <Text style={styles.numberThumb}>{distance}</Text>
                  </View>
                )}
                renderMinimumTrackComponent={() => (
                  <LinearGradientCustom style={styles.minimumTrackStyle} />
                )}
                maximumTrackStyle={styles.maximumTrackStyle}
              />
              <TouchableOpacity
                style={styles.containerIcon}
                onPress={() => {
                  if (distance < 200) setDistance((state) => state + 1);
                }}
              >
                <View style={styles.lineMinusIcon} />
                <View style={styles.linePlusIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerPointers}>
              <Text style={styles.numbersThumb}>1</Text>
              <Text style={styles.numbersThumb}>200</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerSelectRatings}>
          <Text style={styles.labelSectors}>
            <Trans>Only with rating:</Trans>
          </Text>
          <View style={styles.containerRatings}>
            {ratings.map((rating) => {
              const isSelect =
                selectRating !== null ? rating <= selectRating : false;
              const styleTitle = isSelect
                ? styles.titleSelectRating
                : styles.titleRating;

              return isSelect ? (
                <TouchableOpacity
                  key={`rating-select-${rating}`}
                  onPress={() => {
                    onSelectRating(rating);
                  }}
                >
                  <LinearGradientCustom style={styles.containerRating}>
                    <Text style={styleTitle}>{rating}</Text>
                  </LinearGradientCustom>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={`rating-${rating}`}
                  onPress={() => {
                    onSelectRating(rating);
                  }}
                >
                  <View style={styles.containerRating}>
                    <Text style={styleTitle}>{rating}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <InputButton
          isSelect
          isMultiLines
          disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
          placeholder={i18n._("All works")}
          value={valueTypesWork}
          label={i18n._("Type works")}
          onPress={onPressSelectTypesWork}
          containerStyle={styles.containerStyleInputButton}
          inputWrapperStyle={styles.inputWrapperStyleInputButton}
          rightElementInput={
            <IconArrowRightEvent
              width={15}
              height={20}
              fill={colors.blackCoffee}
            />
          }
        />
        <ButtonCustom
          title={i18n._("Filter")}
          onSubmit={onSubmitFilters}
          styleContainer={styles.buttonSubmit}
        />
      </View>
      <ModalSheetTypeWorkshops
        isShowTypeWorkshops={isShowTypeWorkshops}
        onClose={onSubmitTypeWorkshop}
        typeWorkshops={typeWorkshops}
        setTypeWorkshops={setTypeWorkshops}
        onSubmit={onSubmitTypeWorkshop}
      />
      <ModalSheetTypesMotoWorks
        isShow={isShowTypesMotoWorks}
        onClose={onSubmitMotoTypeWorks}
        selectMotoTypesWorks={selectMotoTypesWorks}
        setSelectMotoTypesWorks={setSelectMotoTypesWorks}
        onSubmit={onSubmitMotoTypeWorks}
      />
      <ModalSheetTypesAutoWorks
        isShow={isShowTypesAutoWorks}
        onClose={onSubmitAutoTypeWorks}
        selectAutoTypesWorks={selectAutoTypesWorks}
        setSelectAutoTypesWorks={setSelectAutoTypesWorks}
        onSubmit={onSubmitAutoTypeWorks}
      />
    </View>
  );
};
