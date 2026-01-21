import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import lodash from "lodash";

// types
import { ItemSearchPlaceType } from "./ModalSheetSearchPlace.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { usePlacesProvider } from "../../providers/PlacesProvider/PlacesProvider";

// components
import { ModalsSheet } from "../ModalsSheet/ModalsSheet";
import { Input } from "../Input/Input";
import { LinearGradientCustom } from "../LinearGradientCustom/LinearGradientCustom";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";
import { CheckboxPoint } from "../CheckboxPoint/CheckboxPoint";

// icons
import { IconSearchInput } from "../../icons/components";

// styles
import { styles } from "./ModalSheetSearchPlace.styles";

type ModalSheetSearchPlaceProps = {
  isOpen: boolean;
  statePlace?: ItemSearchPlaceType;
  onClose: () => void;
  onSubmit: (place: ItemSearchPlaceType) => void;
};

export const ModalSheetSearchPlace: FunctionComponent<
  ModalSheetSearchPlaceProps
> = ({ isOpen, statePlace, onClose, onSubmit }) => {
  const { i18n, language } = useLocalesProvider();
  const { getSearchPlace } = usePlacesProvider();
  const [isShowOther, setIsShowOther] = useState(false);
  const [list, setList] = useState<ItemSearchPlaceType[] | null>(null);
  const [value, setValue] = useState("");
  const [select, setSelect] = useState<ItemSearchPlaceType | null>(null);
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const isSelectList = useMemo(
    () =>
      list
        ? list.filter((item) => item.placeId === select?.placeId).length > 0
        : false,
    [list, select]
  );

  const throttled = useRef(
    lodash.throttle(async (newValue: string, isDeep: boolean) => {
      const result = await getSearchPlace(newValue, isDeep);
      const newList = result
        ? [
            ...result.resultGoogle.map((item) => ({
              placeId: item.place_id,
              title: item.description,
            })),
            ...result.resultDB.map((item) => ({
              placeId: item.place_id,
              title: item[language].formatted_address,
            })),
          ]
        : [];
      const newCurrentList = newList.reduce<ItemSearchPlaceType[]>(
        (state, next) => {
          const is =
            state.filter(({ placeId }) => placeId === next.placeId).length > 0;
          if (is) return state;
          return [...state, next];
        },
        []
      );
      setList(newCurrentList);
    }, 2000)
  );

  const showOther = () => {
    const timeout = setTimeout(() => {
      setIsShowOther(true);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  };

  const onToggleDeepSearch = () => {
    if (value.length > 2 && !isDeepSearch) throttled.current(value, true);
    setIsDeepSearch((state) => !state);
  };

  const onPressSubmit = () => {
    if (select) onSubmit(select);
  };

  useEffect(() => {
    if (value.length > 2) throttled.current(value, isDeepSearch);
  }, [value]);

  useEffect(() => {
    if (isOpen) showOther();
    if (isOpen && statePlace?.placeId.length) {
      setSelect(statePlace);
      setList([statePlace]);
    }
  }, [isOpen, statePlace]);

  return (
    <Modal visible={isOpen} transparent>
      <ModalsSheet isShow={isOpen} onClose={onClose}>
        <View style={styles.container}>
          <Shadow stretch>
            <View style={styles.containerHeader}>
              <Text style={styles.title}>{i18n._("Specify the city")}</Text>
              <LinearGradientCustom style={styles.lineHeader} />
              <Input
                isSelect
                placeholder={i18n._("Enter text to search")}
                value={value}
                onChange={setValue}
                InputIcon={<IconSearchInput width={26} height={26} />}
                containerStyle={styles.inputSearch}
                wrapperStyle={styles.wrapperInput}
              />
            </View>
          </Shadow>
          <ScrollView contentContainerStyle={styles.containerList}>
            {select && !isSelectList ? (
              <TouchableOpacity
                key={`place-select-${select.placeId}`}
                style={styles.containerItemList}
                onPress={() => {
                  setSelect(select);
                }}
              >
                <Text numberOfLines={2} style={styles.titleItemList}>
                  {select.title}
                </Text>
                <CheckboxPoint isSelect />
              </TouchableOpacity>
            ) : null}
            {list?.length ? (
              list.map((place, index) => (
                <TouchableOpacity
                  key={`place-${place.placeId}-${index + 1}`}
                  style={styles.containerItemList}
                  onPress={() => {
                    setSelect(place);
                  }}
                >
                  <Text numberOfLines={2} style={styles.titleItemList}>
                    {place.title}
                  </Text>
                  <CheckboxPoint isSelect={select?.placeId === place.placeId} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.titleEmptyList}>
                {i18n._("Please enter text for searching")}
              </Text>
            )}
            {isShowOther ? (
              <>
                {!isDeepSearch ? (
                  <Text style={styles.titleOtherList}>
                    {i18n._(
                      "If there is no suitable option in the list, use 'Deep Search'"
                    )}
                  </Text>
                ) : null}
                <ButtonCustom
                  type={isDeepSearch ? "full" : "transparent"}
                  onSubmit={onToggleDeepSearch}
                  title={
                    isDeepSearch
                      ? i18n._("Disable Deep Search")
                      : i18n._("Enable Deep Search")
                  }
                />
              </>
            ) : null}
          </ScrollView>
          <View>
            <Shadow stretch>
              <View style={styles.containerSubmitModalTypeWork}>
                <ButtonCustom
                  disabled={!select}
                  title={i18n._("Select")}
                  onSubmit={onPressSubmit}
                />
                <ButtonCustom
                  type="transparent"
                  disabled={false}
                  title={i18n._("Back")}
                  onSubmit={onClose}
                />
              </View>
            </Shadow>
          </View>
        </View>
      </ModalsSheet>
    </Modal>
  );
};
