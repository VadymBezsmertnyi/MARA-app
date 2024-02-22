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
import { TypeDataCategory, TypeModalCategories } from "../../MarketAdd.types";

// providers
import { localesContext } from "../../../../../../localization/localization.provider";

// helps
import { useCategoriesMarket } from "../../../../../helps/useCategoriesMarket";

// components
import { ModalsSheet } from "../../../../../components/ModalsSheet/ModalsSheet";
import { LinearGradientCustom } from "../../../../../components/LinearGradientCustom/LinearGradientCustom";
import { CheckboxPoint } from "../../../../../components/CheckboxPoint/CheckboxPoint";
import { ButtonCustom } from "../../../../../components/ButtonCustom/ButtonCustom";
import { Input } from "../../../../../components/Input/Input";
import { CheckboxClassic } from "../../../../../components/CheckboxClassic/CheckboxClassic";

// constants
import {
  NAME_AUTO_PARTS,
  NAME_BRAND_AUTO,
  NAME_BRAND_MOTO,
  NAME_MAIN_CATEGORIES,
  NAME_MOTO_PARTS,
  NAME_TYPE_FUEL,
  NAME_TYPE_TRANSMISSION,
} from "../../MarketAdd.constants";

// icons
import { IconSearchInput } from "../../../../../icons/components";

// styles
import { styles } from "./ModalSheetCategories.styles";

type ModalSheetCategoriesProps = {
  type: TypeModalCategories | null;
  selectData?: Record<TypeModalCategories, TypeDataCategory | undefined> | null;
  onClose: () => void;
  onSubmit?: (type: TypeModalCategories, select: TypeDataCategory) => void;
  isMultiSelect?: boolean;
  multiselectData?: Record<
    TypeModalCategories,
    TypeDataCategory[] | undefined
  > | null;
  onSubmitMultiselect?: (
    type: TypeModalCategories,
    select: TypeDataCategory[]
  ) => void;
};

export const ModalSheetCategories: FunctionComponent<
  ModalSheetCategoriesProps
> = ({
  type,
  selectData = null,
  onClose,
  onSubmit,
  isMultiSelect = false,
  multiselectData = null,
  onSubmitMultiselect,
}) => {
  const { i18n } = useContext(localesContext);
  const {
    mainCategories,
    brandsMoto,
    brandsAuto,
    fuelTypes,
    transmissionTypes,
    motoParts,
    autoParts,
  } = useCategoriesMarket(i18n);
  const [select, setSelect] = useState<TypeDataCategory | null>(null);
  const [multiselect, setMultiselect] = useState<TypeDataCategory[] | null>(
    null
  );
  const [search, setSearch] = useState("");
  const isOpen = useMemo(() => type !== null, [type]);
  const isBrand = useMemo(
    () => type === NAME_BRAND_AUTO || type === NAME_BRAND_MOTO,
    [type]
  );

  const titleShow = useMemo(() => {
    if (type === NAME_MAIN_CATEGORIES) return i18n._("Category");
    if (type === NAME_BRAND_MOTO) return i18n._("Motorcycle brand");
    if (type === NAME_BRAND_AUTO) return i18n._("Car's make");
    if (type === NAME_TYPE_FUEL) return i18n._("Type of fuel");
    if (type === NAME_TYPE_TRANSMISSION) return i18n._("Type of transmission");
    if (type === NAME_MOTO_PARTS) return i18n._("Motorcycle parts");
    if (type === NAME_AUTO_PARTS) return i18n._("Car parts");
    return "";
  }, [type]);

  const data = useMemo(() => {
    if (type === NAME_MAIN_CATEGORIES) return mainCategories;
    if (type === NAME_BRAND_MOTO) return brandsMoto;
    if (type === NAME_BRAND_AUTO) return brandsAuto;
    if (type === NAME_TYPE_FUEL) return fuelTypes;
    if (type === NAME_TYPE_TRANSMISSION) return transmissionTypes;
    if (type === NAME_MOTO_PARTS) return motoParts;
    if (type === NAME_AUTO_PARTS) return autoParts;
    return [];
  }, [type]);

  const showData = useMemo(
    () =>
      isBrand
        ? data.filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : data,
    [isBrand, data, search]
  );

  const onPressSave = () => {
    if (onSubmit && !isMultiSelect && type !== null && select !== null)
      onSubmit(type, select);
    if (
      onSubmitMultiselect &&
      isMultiSelect &&
      type !== null &&
      multiselect !== null
    )
      onSubmitMultiselect(type, multiselect);
    setSelect(null);
    setMultiselect(null);
    setSearch("");
    onClose();
  };

  const setOldDate = () => {
    if (selectData) {
      if (type === NAME_MAIN_CATEGORIES && selectData.category)
        setSelect(selectData.category);
      if (type === NAME_BRAND_MOTO && selectData.brandMoto)
        setSelect(selectData.brandMoto);
      if (type === NAME_BRAND_AUTO && selectData.brandAuto)
        setSelect(selectData.brandAuto);
      if (type === NAME_TYPE_FUEL && selectData.typeFuel)
        setSelect(selectData.typeFuel);
      if (type === NAME_TYPE_TRANSMISSION && selectData.typeTransmission)
        setSelect(selectData.typeTransmission);
      if (type === NAME_MOTO_PARTS && selectData.motoParts)
        setSelect(selectData.motoParts);
      if (type === NAME_AUTO_PARTS && selectData.autoParts)
        setSelect(selectData.autoParts);
    }
  };

  const setOldDataMultiselect = () => {
    if (multiselectData) {
      if (type === NAME_MAIN_CATEGORIES && multiselectData.category)
        setMultiselect(multiselectData.category);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.brandMoto)
        setMultiselect(multiselectData.brandMoto);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.brandAuto)
        setMultiselect(multiselectData.brandAuto);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.typeFuel)
        setMultiselect(multiselectData.typeFuel);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.typeTransmission)
        setMultiselect(multiselectData.typeTransmission);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.motoParts)
        setMultiselect(multiselectData.motoParts);
      if (type === NAME_MAIN_CATEGORIES && multiselectData.autoParts)
        setMultiselect(multiselectData.autoParts);
    }
  };

  const onMultiselect = (itemData: TypeDataCategory) => {
    if (multiselect) {
      const isSelect = multiselect
        ? multiselect.filter((item) => item.id === itemData.id).length > 0
        : false;
      const newMultiselect = isSelect
        ? multiselect.filter((item) => item.id !== itemData.id)
        : [...multiselect, itemData];
      setMultiselect(newMultiselect);
    } else setMultiselect([itemData]);
  };

  useEffect(() => {
    if (isOpen)
      if (isMultiSelect) setOldDataMultiselect();
      else setOldDate();
  }, [isOpen]);

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
        <View style={styles.container}>
          <Shadow stretch disabled={!isBrand}>
            <View style={styles.containerHeader}>
              <Text style={styles.title}>{titleShow}</Text>
              <LinearGradientCustom style={styles.lineHeader} />
              {isBrand ? (
                <Input
                  isSelect
                  placeholder={i18n._("Enter text to search")}
                  value={search}
                  onChange={setSearch}
                  InputIcon={<IconSearchInput width={26} height={26} />}
                  containerStyle={styles.inputSearch}
                />
              ) : null}
            </View>
          </Shadow>
          <ScrollView style={styles.containerList}>
            {showData.map((itemData) => {
              const isSelect =
                isMultiSelect && multiselect
                  ? multiselect.filter(
                      (selectMulti) => selectMulti.id === itemData.id
                    ).length > 0
                  : itemData.id === select?.id;
              return (
                <TouchableOpacity
                  key={`select-${type}-${itemData.id}`}
                  style={styles.containerItemList}
                  onPress={() => {
                    if (isMultiSelect) onMultiselect(itemData);
                    else setSelect(itemData);
                  }}
                >
                  <Text>{itemData.name}</Text>
                  {isMultiSelect ? (
                    <CheckboxClassic
                      isGradient
                      check={isSelect}
                      setCheck={() => {
                        onMultiselect(itemData);
                      }}
                    />
                  ) : (
                    <CheckboxPoint isSelect={isSelect} />
                  )}
                </TouchableOpacity>
              );
            })}
            <View style={styles.containerEmpty} />
          </ScrollView>
          <View style={styles.containerSubmitModalTypeWork}>
            <ButtonCustom
              disabled={select === null && !isMultiSelect}
              title={i18n._("Select")}
              onSubmit={onPressSave}
            />
          </View>
        </View>
      </ModalsSheet>
    </Modal>
  );
};
