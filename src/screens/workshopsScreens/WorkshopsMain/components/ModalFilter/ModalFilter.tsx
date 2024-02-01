import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { Trans } from "@lingui/macro";

// types
import { TypeFilters } from "./ModalFilter.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";
import { TypeWorkType } from "../../../../../providers/WorkshopsProvider/WorkshopsProvider.types";

// hooks
import { useWorkshopsProvider } from "../../../../../providers/WorkshopsProvider/useWorkshopsProvider.constants";

// components
import { Header } from "../../../../../components/Header/Header";
import { InputButton } from "../../../../../components/InputButton/InputButton";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { ModalsSheet } from "../../../../../components/ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";
import { CheckboxClassic } from "../../../../../components/CheckboxClassic/CheckboxClassic";

// icons
import {
  IconArrowRightEvent,
  IconAutoService,
  IconMotoService,
} from "../../../../../icons/components";

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
    setIsShowTypeWorkshops(false);
  };

  const onPressSelectTypesWork = () => {
    if (typeWorkshops.moto) setIsShowTypesMotoWorks(true);
    else if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSelectMotoTypeWork = (typeMotoWork: TypeWorkType) => {
    const isBe = selectMotoTypesWorks.includes(typeMotoWork.id);
    if (isBe)
      setSelectMotoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeMotoWork.id)
      );
    else setSelectMotoTypesWorks((state) => [...state, typeMotoWork.id]);
  };

  const onSubmitMotoTypeWorks = () => {
    setIsShowTypesMotoWorks(false);
    if (typeWorkshops.auto) setIsShowTypesAutoWorks(true);
  };

  const onSelectAutoTypeWork = (typeAutoWork: TypeWorkType) => {
    const isBe = selectAutoTypesWorks.includes(typeAutoWork.id);
    if (isBe)
      setSelectAutoTypesWorks((state) =>
        state.filter((idTypeWork) => idTypeWork !== typeAutoWork.id)
      );
    else setSelectAutoTypesWorks((state) => [...state, typeAutoWork.id]);
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
        title={"Filter"}
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
                  key={`rating-${rating}`}
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
      <ModalsSheet
        isShow={isShowTypeWorkshops}
        onClose={() => {
          setIsShowTypeWorkshops(false);
        }}
      >
        <View style={styles.containerModalType}>
          <View>
            <Text style={styles.titleModalType}>
              <Trans>Type workshops</Trans>
            </Text>
            <LinearGradientCustom style={styles.lineModalType} />
            <View style={styles.containerSelect}>
              <Text style={styles.titleSelect}>Repair of motorcycles</Text>
              <View style={styles.containerRightSelect}>
                {typeWorkshops.moto ? (
                  <IconMotoService width={28} height={28} />
                ) : null}
                <CheckboxClassic
                  check={typeWorkshops.moto}
                  setCheck={(moto) => {
                    setTypeWorkshops((state) => ({ ...state, moto }));
                  }}
                  isGradient
                />
              </View>
            </View>
            <View style={styles.containerSelect}>
              <Text style={styles.titleSelect}>Repair of automobiles</Text>
              <View style={styles.containerRightSelect}>
                {typeWorkshops.auto ? (
                  <IconAutoService width={28} height={28} />
                ) : null}
                <CheckboxClassic
                  check={typeWorkshops.auto}
                  setCheck={(auto) => {
                    setTypeWorkshops((state) => ({ ...state, auto }));
                  }}
                  isGradient
                />
              </View>
            </View>
          </View>
          <ButtonCustom
            disabled={!(typeWorkshops.auto || typeWorkshops.moto)}
            title={i18n._("Select")}
            onSubmit={onSubmitTypeWorkshop}
          />
        </View>
      </ModalsSheet>
      <ModalsSheet
        isShow={isShowTypesMotoWorks}
        onClose={() => {
          setIsShowTypesMotoWorks(false);
        }}
      >
        <View style={styles.containerModalTypeWork}>
          <View style={styles.containerHeaderTypeWork}>
            <Text style={styles.titleModalType}>
              <Trans>Types of work for motorcycle transport:</Trans>
            </Text>
            <LinearGradientCustom style={styles.lineModalType} />
          </View>
          <ScrollView>
            <View style={styles.containerTypesWork}>
              {typesWorkServices.moto.map((workMoto) => {
                const isSelect = selectMotoTypesWorks.includes(workMoto.id);
                return (
                  <View
                    key={`moto-work-${workMoto.id}`}
                    style={styles.containerTypeWork}
                  >
                    <View style={styles.containerTitlesTypeWork}>
                      <Text style={styles.titleTypeWork}>{workMoto.title}</Text>
                      <Text style={styles.subTitleTypeWork}>
                        {workMoto.description}
                      </Text>
                    </View>
                    <CheckboxClassic
                      isGradient
                      check={isSelect}
                      setCheck={() => {
                        onSelectMotoTypeWork(workMoto);
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.containerSubmitModalTypeWork}>
            <ButtonCustom
              disabled={selectMotoTypesWorks.length === 0}
              title={i18n._("Select")}
              onSubmit={onSubmitMotoTypeWorks}
            />
          </View>
        </View>
      </ModalsSheet>
      <ModalsSheet
        isShow={isShowTypesAutoWorks}
        onClose={() => {
          setIsShowTypesAutoWorks(false);
        }}
      >
        <View style={styles.containerModalTypeWork}>
          <View style={styles.containerHeaderTypeWork}>
            <Text style={styles.titleModalType}>
              <Trans>Types of work for automobile transport:</Trans>
            </Text>
            <LinearGradientCustom style={styles.lineModalType} />
          </View>
          <ScrollView>
            <View style={styles.containerTypesWork}>
              {typesWorkServices.auto.map((workAuto) => {
                const isSelect = selectAutoTypesWorks.includes(workAuto.id);
                return (
                  <View
                    key={`auto-work-${workAuto.id}`}
                    style={styles.containerTypeWork}
                  >
                    <View style={styles.containerTitlesTypeWork}>
                      <Text style={styles.titleTypeWork}>{workAuto.title}</Text>
                      <Text style={styles.subTitleTypeWork}>
                        {workAuto.description}
                      </Text>
                    </View>
                    <CheckboxClassic
                      isGradient
                      check={isSelect}
                      setCheck={() => {
                        onSelectAutoTypeWork(workAuto);
                      }}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.containerSubmitModalTypeWork}>
            <ButtonCustom
              disabled={selectAutoTypesWorks.length === 0}
              title={i18n._("Select")}
              onSubmit={onSubmitAutoTypeWorks}
            />
          </View>
        </View>
      </ModalsSheet>
    </View>
  );
};
