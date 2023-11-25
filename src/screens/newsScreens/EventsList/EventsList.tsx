import React, { FunctionComponent, useState } from 'react';
import { Text, View } from 'react-native';
import { Trans } from '@lingui/macro';

// components
import { InputSearch } from '../../../components/InputSearch/InputSearch';

// styles
import { styles } from './EventsList.styles';

export const EventsList: FunctionComponent = () => {
  const [valueSearch, setValueSearch] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Trans>Upcoming events:</Trans>
      </Text>
      <InputSearch value={valueSearch} onChangeText={setValueSearch} />
    </View>
  );
};
