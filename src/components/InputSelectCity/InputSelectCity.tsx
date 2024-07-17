import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { t } from "@lingui/macro";

// types
import { PlaceDbType } from "../../providers/PlacesProvider/PlacesProvider.types";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// components
import { ArrowDown, IconLocationMarker } from "../../icons/components";

// styles
import colors from "../../../styles/colors";
import { styles } from "./InputSelectCity.styles";

type InputSelectCityProps = {
  data: PlaceDbType[];
  onSelect: (value: PlaceDbType) => void;
};

export const InputSelectCity: FunctionComponent<InputSelectCityProps> = ({
  data,
  onSelect,
}) => {
  const { i18n, language } = useLocalesProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectCity, setSelectCity] = useState<PlaceDbType | null>(null);
  const currentCity = useMemo(() => [null, ...data], [data]);
  const showListCity = useMemo(
    () =>
      currentCity.filter((city) =>
        value.length && city
          ? city[language].formatted_address
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
          : true
      ),
    [currentCity, value]
  );

  const stylesContainer = useMemo(
    () => [styles.container, isOpen && styles.containerPosition],
    [isOpen]
  );

  const onSelectCity = (city: PlaceDbType) => {
    setSelectCity(city);
    setIsOpen(false);
    setValue(city[language].formatted_address || "");
    onSelect(city);
  };

  const showCity = useMemo(() => {
    if (value && selectCity)
      return <Text style={styles.titleInput}>{value}</Text>;
    return <Text style={styles.defaultTitleInput}>{t(i18n)`All cities`}</Text>;
  }, [value, selectCity, i18n]);

  return (
    <>
      {isOpen ? (
        <Pressable
          style={styles.backgroundButton}
          onPress={() => {
            setIsOpen(false);
          }}
        />
      ) : null}
      <View style={styles.mainContainer}>
        <TouchableOpacity
          disabled={isOpen}
          style={stylesContainer}
          onPress={() => {
            setIsOpen(true);
          }}
        >
          <View style={styles.containerInput}>
            <IconLocationMarker
              width={16}
              height={16}
              fill={colors.californiaOrange}
            />
            {isOpen ? (
              <TextInput
                style={styles.input}
                placeholder={t(i18n)`All cities`}
                value={value}
                onChangeText={setValue}
                onFocus={() => {
                  setIsOpen(true);
                }}
                onBlur={() => {
                  setIsOpen(false);
                }}
              />
            ) : (
              <View style={styles.input}>{showCity}</View>
            )}
            {isOpen ? (
              <View style={styles.arrowToUp}>
                <ArrowDown width={16} height={16} fill={colors.black} />
              </View>
            ) : (
              <ArrowDown width={16} height={16} fill={colors.black} />
            )}
          </View>
          {isOpen ? (
            <ScrollView
              style={{
                zIndex: 100,
                backgroundColor: colors.white,
              }}
              contentContainerStyle={styles.containerList}
            >
              {showListCity.length > 1 ? (
                showListCity.map((city) =>
                  city ? (
                    <TouchableHighlight
                      underlayColor={colors.grayMercury}
                      key={`select-input-city-${city._id}`}
                      onPress={() => {
                        onSelectCity(city);
                      }}
                      style={styles.city}
                    >
                      <Text>
                        {city[language].formatted_address.length
                          ? city[language].formatted_address
                          : i18n._(`All cities`)}
                      </Text>
                    </TouchableHighlight>
                  ) : null
                )
              ) : (
                <Text
                  style={{
                    padding: 10,
                    textAlign: "center",
                  }}
                >
                  {i18n._("No cities found")}
                </Text>
              )}
            </ScrollView>
          ) : null}
        </TouchableOpacity>
      </View>
    </>
  );
};
