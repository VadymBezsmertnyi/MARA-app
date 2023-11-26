import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../localization/localization.provider';

// components
import { ArrowDown, IconLocationMarker } from '../../icons/components';

// styles
import colors from '../../../styles/colors';
import { styles } from './InputSelectCity.styles';

type Item = {
  id: number;
  title: string;
};

type InputSelectCityProps = {
  data: Item[];
  onSelect: (value: Item) => void;
};

export const InputSelectCity: FunctionComponent<InputSelectCityProps> = ({ data, onSelect }) => {
  const { i18n } = useContext(localesContext);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectCity, setSelectCity] = useState<Item | null>(null);
  const currentCity = useMemo(() => [{ id: 0, title: '' }, ...data], [data]);
  const showListCity = useMemo(
    () =>
      currentCity.filter(city =>
        value.length && city.title
          ? city.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          : true,
      ),
    [currentCity, value],
  );

  const stylesContainer = useMemo(
    () => [styles.container, isOpen && styles.containerPosition],
    [isOpen],
  );

  const onSelectCity = (city: Item) => {
    setSelectCity(city);
    setIsOpen(false);
    setValue(city.title || '');
    onSelect(city);
  };

  const showCity = useMemo(() => {
    if (value && selectCity) return <Text style={styles.titleInput}>{value}</Text>;
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
            <IconLocationMarker width={16} height={16} fill={colors.californiaOrange} />
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
              style={{ zIndex: 1, backgroundColor: colors.white }}
              contentContainerStyle={styles.containerList}
            >
              {showListCity.map(city => (
                <TouchableHighlight
                  underlayColor={colors.grayMercury}
                  key={`select-input-city-${city.id}`}
                  onPress={() => {
                    onSelectCity(city);
                  }}
                  style={styles.city}
                >
                  <Text>{city.title.length ? city.title : t(i18n)`All cities`}</Text>
                </TouchableHighlight>
              ))}
            </ScrollView>
          ) : null}
        </TouchableOpacity>
      </View>
    </>
  );
};
