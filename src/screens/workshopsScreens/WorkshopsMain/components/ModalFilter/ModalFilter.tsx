import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

// types
import { TypeFilters } from "./ModalFilter.types";

// redux
import {
  useUserSelector,
  setUserData,
} from "../../../../../storeRedux/apis/user/slice";
import { useEditUserMutation } from "../../../../../storeRedux/api";
import { useRootDispatch } from "../../../../../storeRedux/store";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMapProvider } from "../../../../../providers/MapProvider/MapProvider";

// hooks
import { useWorkshopsProviderState } from "../../../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { Header } from "../../../../../components/Header/Header";
import { InputButton } from "../../../../../components/InputButton/InputButton";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";
import { ModalSheetTypeWorkshops } from "../../../../../components/ModalSheetTypeWorkshops/ModalSheetTypeWorkshops";
import { ModalSheetTypesMotoWorks } from "../../../../../components/ModalSheetTypesMotoWorks/ModalSheetTypesMotoWorks";
import { ModalSheetTypesAutoWorks } from "../../../../../components/ModalSheetTypesAutoWorks/ModalSheetTypesAutoWorks";
import { InputSlider } from "../../../../../components/InputSlider/InputSlider";

// icons
import { IconArrowRightEvent } from "../../../../../icons/components";

// styles
import { styles } from "./ModalFilter.styles";
import colors from "../../../../../../styles/colors";

type ModalFilterProps = {
  filters: TypeFilters | null;
  onClose: () => void;
  onSubmit: (filters: TypeFilters) => void;
  maxDistance?: number;
};

export const ModalFilter: FunctionComponent<ModalFilterProps> = ({
  onClose,
  onSubmit,
  filters,
  maxDistance = 200,
}) => {
  const { i18n } = useLocalesProvider();
  const { userData } = useUserSelector();
  const dispatch = useRootDispatch();
  const [editUserMutation] = useEditUserMutation();
  const { location } = useMapProvider();
  const { typesWorkServices } = useWorkshopsProviderState();
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
    const newFilters: TypeFilters = {
      moto: typeWorkshops.moto ? selectMotoTypesWorks : null,
      auto: typeWorkshops.auto ? selectAutoTypesWorks : null,
      maxDistance: distance,
      minRating: selectRating,
    };
    onSubmit(newFilters);
  };

  const hasFiltersChanged = useMemo(() => {
    const currentMoto = typeWorkshops.moto ? selectMotoTypesWorks : null;
    const currentAuto = typeWorkshops.auto ? selectAutoTypesWorks : null;
    const currentDistance = distance;
    const currentRating = selectRating;

    if (!filters) {
      const hasAnyFilter =
        currentMoto !== null ||
        currentAuto !== null ||
        currentDistance !== 5 ||
        currentRating !== null;
      return hasAnyFilter;
    }

    const motoChanged =
      (filters.moto === null && currentMoto !== null) ||
      (filters.moto !== null && currentMoto === null) ||
      (filters.moto !== null &&
        currentMoto !== null &&
        JSON.stringify([...filters.moto].sort()) !==
          JSON.stringify([...currentMoto].sort()));

    const autoChanged =
      (filters.auto === null && currentAuto !== null) ||
      (filters.auto !== null && currentAuto === null) ||
      (filters.auto !== null &&
        currentAuto !== null &&
        JSON.stringify([...filters.auto].sort()) !==
          JSON.stringify([...currentAuto].sort()));

    const distanceChanged = filters.maxDistance !== currentDistance;
    const ratingChanged = filters.minRating !== currentRating;

    return motoChanged || autoChanged || distanceChanged || ratingChanged;
  }, [
    filters,
    typeWorkshops,
    selectMotoTypesWorks,
    selectAutoTypesWorks,
    distance,
    selectRating,
  ]);
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

  const onToggleLocation = async () => {
    if (!userData) return;
    const isGeoLocation = !(userData.isGeoLocation || false);
    const isGeoLocationBackground = isGeoLocation
      ? userData.isGeoLocationBackground || false
      : false;
    const result = await editUserMutation({
      body: {
        isGeoLocation,
        isGeoLocationBackground,
      },
      existingUserData: userData,
    });
    if (result.data?.userData) dispatch(setUserData(result.data.userData));
  };

  const isLocationEnabled = userData?.isGeoLocation || false;
  const isLocationLoading = isLocationEnabled && !location;

  useEffect(() => {
    if (filters) {
      setTypeWorkshops({
        moto: filters.moto !== null,
        auto: filters.auto !== null,
      });
      if (filters.moto !== null) setSelectMotoTypesWorks(filters.moto);
      else setSelectMotoTypesWorks([]);
      if (filters.auto !== null) setSelectAutoTypesWorks(filters.auto);
      else setSelectAutoTypesWorks([]);
      if (filters.maxDistance) setDistance(filters.maxDistance);
      if (filters.minRating) setSelectRating(filters.minRating);
      else setSelectRating(null);
    } else {
      setTypeWorkshops({ moto: false, auto: false });
      setSelectMotoTypesWorks([]);
      setSelectAutoTypesWorks([]);
      setDistance(5);
      setSelectRating(null);
    }
  }, [filters]);

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Filter")}
        onPressLeftElement={onClose}
        backgroundStyle={styles.headerBackground}
        rightStyle={styles.containerRightHeader}
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
              height={15}
              fill={colors.blackCoffee}
            />
          }
        />
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
        <View style={styles.containerSelectRatings}>
          <Text style={styles.labelSectors}>{i18n._("Only with rating:")}</Text>
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
              height={15}
              fill={colors.blackCoffee}
            />
          }
        />
        <ButtonCustom
          title={i18n._("Filtering")}
          onSubmit={onSubmitFilters}
          styleContainer={styles.buttonSubmit}
          disabled={!hasFiltersChanged}
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
