import React, { FunctionComponent, useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Input } from '../../../components/Input/Input';
import { ButtonCustom } from '../../../components/ButtonCustom/ButtonCustom';
import { AddressItem } from './components/AddressItem/AddressItem';
import { IconTabMap } from '../../../icons/components';

import { localesContext } from '../../../../localization/localization.provider';

import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';
import { PATHS_NEWS_SCREENS } from '../../../navigators/useNavigator.constants';

import { styles } from './LocationEventInput.styles';
import colors from '../../../../styles/colors';

const DEFAULT_ADDRESS = [
  { id: 0, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 1, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 2, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 3, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 4, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 5, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
  { id: 6, street: 'вул. Карманцінара', city: 'Жовті Води, Дніпропетровська область' },
];

type LocationEventInputProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const LocationEventInput: FunctionComponent<LocationEventInputProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const [eventName, setEventName] = useState('');
  const [eventBuild, setEventBuild] = useState('');
  const [address, setAddress] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n._('Enter the address')}:</Text>
        <Input
          placeholder={i18n._('Enter the name of the event')}
          value={eventName}
          onChange={setEventName}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {DEFAULT_ADDRESS.map(address => (
          <AddressItem
            key={address.id}
            street={address.street}
            city={address.city}
            build={eventBuild}
            setBuild={setEventBuild}
            setAddress={() => {
              setAddress(address.city + address.street);
            }}
          />
        ))}
        <View style={styles.wrapper}>
          <ButtonCustom
            onSubmit={() => {
              navigation.navigate(PATHS_NEWS_SCREENS.locationEventMap);
            }}
          >
            <View style={styles.inner}>
              <IconTabMap width={28} hanging={23} fill={colors.white} />
              <Text style={styles.buttonTitle}>{i18n._('Select on the map')}</Text>
            </View>
          </ButtonCustom>
        </View>
      </ScrollView>
    </View>
  );
};
