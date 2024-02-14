import React, { FunctionComponent, useContext, useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

// styles
import { styles } from "./ModalSheetCategories.styles";
import { Input } from "../../../../../components/Input/Input";
import { IconSearchInput } from "../../../../../icons/components";
import { Shadow } from "react-native-shadow-2";

type ModalSheetCategoriesProps = {
  type: TypeModalCategories | null;
  onClose: () => void;
  onSubmit: (type: TypeModalCategories, select: TypeDataCategory) => void;
};

export const ModalSheetCategories: FunctionComponent<
  ModalSheetCategoriesProps
> = ({ type, onClose, onSubmit }) => {
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
  const [search, setSearch] = useState("");
  const isOpen = useMemo(() => type !== null, [type]);
  const isBrand = useMemo(
    () => type === NAME_BRAND_AUTO || type === NAME_BRAND_MOTO,
    [type]
  );

  const titleShow = useMemo(() => {
    if (type === NAME_MAIN_CATEGORIES) return i18n._("Category");
    if (type === NAME_BRAND_MOTO) return i18n._("motorcycle brand");
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
    if (select !== null && type !== null) onSubmit(type, select);
    setSelect(null);
    setSearch("");
    onClose();
  };

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
            {showData.map((item) => (
              <TouchableOpacity
                key={`select-${type}-${item.id}`}
                style={styles.containerItemList}
                onPress={() => {
                  setSelect(item);
                }}
              >
                <Text>{item.name}</Text>
                <CheckboxPoint isSelect={item.id === select?.id} />
              </TouchableOpacity>
            ))}
            <View style={styles.containerEmpty} />
          </ScrollView>
          <View style={styles.containerSubmitModalTypeWork}>
            <ButtonCustom
              disabled={select === null}
              title={i18n._("Select")}
              onSubmit={onPressSave}
            />
          </View>
        </View>
      </ModalsSheet>
    </Modal>
  );
};
