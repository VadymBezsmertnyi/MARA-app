import React, { FunctionComponent, useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Trans } from '@lingui/macro';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// constants
import { LIST_CITY } from '../DELETE_InputSelectCity.constants';
import { DEFAULT_LIST_EVENT } from '../DELETE_newsScreens.constants';
import { PATHS_NEWS_SCREENS } from '../../../navigators/useNavigator.constants';

// components
import { Input } from '../../../components/Input/Input';
import { InputSelectCity } from '../../../components/InputSelectCity/InputSelectCity';
import { ItemListEvents } from '../NewsMain/components/ItemListEvents/ItemListEvents';
import { IconSearchInput } from '../../../icons/components';

// types
import { RootNewsScreensParamList } from '../../../navigators/Navigators.types';

import { localesContext } from '../../../../localization/localization.provider';

// styles
import { styles } from './EventsList.styles';

type ItemListEventsProps = {
  navigation: NativeStackNavigationProp<RootNewsScreensParamList>;
};

export const EventsList: FunctionComponent<ItemListEventsProps> = ({ navigation }) => {
  const { i18n } = useContext(localesContext);
  const [valueSearch, setValueSearch] = useState('');

  const onSelectCity = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <Input
        value={valueSearch}
        onChange={setValueSearch}
        placeholder={i18n._('Enter the text to search')}
        InputIcon={<IconSearchInput width={26} height={26} />}
      />
      <InputSelectCity data={LIST_CITY} onSelect={onSelectCity} />
      <ScrollView contentContainerStyle={styles.containerList}>
        {DEFAULT_LIST_EVENT.map(eventItem => (
          <ItemListEvents key={`event-${eventItem.id}`} item={eventItem} navigation={navigation} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.createNewEvent}
        onPress={() => {
          navigation.navigate(PATHS_NEWS_SCREENS.addEvent);
        }}
      >
        <View style={styles.createNewEventWrapper}>
          <View style={styles.horizontal} />
          <View style={styles.vertical} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
