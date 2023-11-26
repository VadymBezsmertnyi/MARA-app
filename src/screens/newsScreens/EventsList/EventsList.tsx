import React, { FunctionComponent, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Trans } from '@lingui/macro';

// constants
import { LIST_CITY } from '../DELETE_InputSelectCity.constants';
import { DEFAULT_LIST_EVENT } from '../DELETE_newsScreens.constants';

// components
import { InputSearch } from '../../../components/InputSearch/InputSearch';
import { InputSelectCity } from '../../../components/InputSelectCity/InputSelectCity';
import { ItemListEvents } from '../NewsMain/components/ItemListEvents/ItemListEvents';

// styles
import { styles } from './EventsList.styles';

export const EventsList: FunctionComponent = () => {
  const [valueSearch, setValueSearch] = useState('');

  const onSelectCity = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <InputSearch value={valueSearch} onChangeText={setValueSearch} />
      <InputSelectCity data={LIST_CITY} onSelect={onSelectCity} />
      <ScrollView contentContainerStyle={styles.containerList}>
        {DEFAULT_LIST_EVENT.map(eventItem => (
          <ItemListEvents key={`event-${eventItem.id}`} item={eventItem} />
        ))}
      </ScrollView>
    </View>
  );
};
